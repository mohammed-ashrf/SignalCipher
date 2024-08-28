use url::form_urlencoded;
use webbrowser;

#[tauri::command]
pub fn send_via_whatsapp(message: String) -> Result<(), String> {
    // URL-encode the message
    let encoded_message = form_urlencoded::byte_serialize(message.as_bytes()).collect::<String>();
    // Construct the WhatsApp URL
    let url = format!("https://api.whatsapp.com/send?text={}", encoded_message);

    // Open the URL in the default browser using webbrowser crate
    if webbrowser::open(&url).is_ok() {
        Ok(())
    } else {
        Err("Failed to open URL".into())
    }
}