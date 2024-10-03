use serde::{Deserialize, Serialize};
use warp::Filter;
use tokio::fs::File as TokioFile;
use tokio::io::AsyncReadExt;
use futures_util::{pin_mut, stream::StreamExt};
use mdns::{Record, RecordKind};
use std::{net::IpAddr, time::Duration};
use std::collections::HashMap;
use mdns_sd::{ServiceDaemon, ServiceInfo};

#[derive(Deserialize, Serialize)]
struct Message {
    text: String,
}

#[derive(Serialize, Deserialize, Clone,Debug)]
pub struct Device {
    ip: String,
    name: String,
}

// Main Warp server function to send and receive files or text
async fn tokio_main() {
    let send_file = warp::path("send_file")
        .and(warp::fs::dir("./files")) // Serve files from a local directory
        .with(warp::reply::with::header("Content-Disposition", "attachment"));

    let receive_message = warp::path("receive_message")
        .and(warp::body::json())
        .map(|message: Message| {
            println!("Received message: {}", message.text);
            warp::reply::json(&message)
        });

    let routes = send_file.or(receive_message);

    println!("Server started at http://localhost:3030");
    warp::serve(routes).run(([0, 0, 0, 0], 3030)).await;
}

#[tauri::command]
pub async fn server_up() {
    tokio_main().await;
}

// Function to send a text message
#[tauri::command]
async fn send_message(text: String, ip: String) -> Result<(), String> {
    let client = reqwest::Client::new();
    let message = Message { text };

    let response = client
        .post(format!("http://{}/receive_message", ip))
        .json(&message)
        .send()
        .await;

    match response {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

// Function to send a file
#[tauri::command]
async fn send_file(ip: String, file_path: String) -> Result<(), String> {
    let mut file = TokioFile::open(file_path).await.map_err(|e| e.to_string())?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer).await.map_err(|e| e.to_string())?;

    let client = reqwest::Client::new();
    let response = client
        .post(format!("http://{}/send_file", ip))
        .body(buffer)
        .send()
        .await;

    match response {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub async fn send_message_to_device(ip: String, message: String) -> Result<(), String> {
    send_message(message, ip).await
}

#[tauri::command]
pub async fn send_file_to_device(ip: String, file_path: String) -> Result<(), String> {
    send_file(ip, file_path).await
}

// Function to discover devices via mDNS
#[tauri::command]
pub async fn discover_devices() -> Result<Vec<Device>, String> {
    let service_name = "_localsend._tcp.local.";  // Updated to match advertising service name
    let timeout = Duration::from_secs(15);  // Timeout for discovery

    // Discover all services matching the service name
    let stream = mdns::discover::all(service_name, timeout)
        .map_err(|e| e.to_string())?
        .listen();

    pin_mut!(stream);

    let mut devices = Vec::new();
    let mut unique_ips = std::collections::HashSet::new();

    while let Some(Ok(response)) = stream.next().await {
        let name = response
            .records()
            .next()
            .map(|record| record.name.clone())
            .unwrap_or_else(|| "Unknown".to_string());

        if let Some(addr) = response.records().filter_map(to_ip_addr).next() {
            if unique_ips.insert(addr) {
                devices.push(Device {
                    ip: addr.to_string(),
                    name,
                });
            }
        }
    }

    if devices.is_empty() {
        println!("No devices found within the timeout.");
    } else {
        println!("Devices discovered: {:?}", devices);
    }

    Ok(devices)
}

// Helper function to extract IP address from mDNS records
fn to_ip_addr(record: &Record) -> Option<IpAddr> {
    match record.kind {
        RecordKind::A(addr) => Some(addr.into()),
        RecordKind::AAAA(addr) => Some(addr.into()),
        _ => None,
    }
}

// Function to advertise the service using mDNS
use hostname::get;
#[tauri::command]
pub async fn advertise_service() -> Result<(), String> {
    // Create a new mDNS service daemon
    let mdns = ServiceDaemon::new().map_err(|e| {
        println!("Failed to create mDNS ServiceDaemon: {}", e);
        e.to_string()
    })?;

    // Define the service you want to advertise
    let service_name = "_localsend._tcp.local."; // The service type
    // Get unique device hostname
    let device_hostname = get()
        .map_err(|_| "Failed to get device hostname".to_string())?
        .into_string()
        .map_err(|_| "Failed to convert hostname to string".to_string())?;

    let instance_name = format!("{}.local.", device_hostname);
    let port = 3030; // Port for your Warp server

    // Resolve the local IP address
    let local_ip = match local_ip_address::local_ip() {
        Ok(IpAddr::V4(ip)) => ip.to_string(),
        Ok(IpAddr::V6(ip)) => ip.to_string(),
        Err(_) => return Err("Could not resolve local IP address".to_string()),
    };

    // Create properties if needed
    let properties = HashMap::new();

    // Register the service with the resolved local IP
    let service_info = ServiceInfo::new(
        service_name,   // Service type domain
        "",              // Subdomain (None if not used)
        &instance_name,   // Instance name (must end with '.local.')
        &local_ip,      // Server's IP address
        port,           // The port where the service is available
        properties,     // Additional metadata
    ).map_err(|e| e.to_string())?;

    // Register the service with mDNS
    mdns.register(service_info).map_err(|e| e.to_string())?;
    print!("discoverable");
    Ok(())
}
