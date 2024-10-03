use tauri_plugin_clipboard_manager::ClipboardExt;
use webbrowser;
use url::form_urlencoded;

#[derive(serde::Serialize)]
pub struct SendResponse {
    platform: String,
    url: String,
}

#[tauri::command]
pub fn send_via_line(message: String) -> Result<SendResponse, String> {
    let encoded_message = form_urlencoded::byte_serialize(message.as_bytes()).collect::<String>();
    let url = format!("https://line.me/R/msg/text/?{}", encoded_message);

    // Detect the platform and return the appropriate message with the URL
    #[cfg(target_os = "android")]
    {
        Ok(SendResponse {
            platform: "mobile".into(),
            url,
        })
    }

    #[cfg(target_os = "ios")]
    {
        Ok(SendResponse {
            platform: "mobile".into(),
            url,
        })
    }

    #[cfg(not(any(target_os = "android", target_os = "ios")))]
    {
        // For desktop environments, open the URL in the browser
        if webbrowser::open(&url).is_ok() {
            Ok(SendResponse {
                platform: "desktop".into(),
                url,
            })
        } else {
            Err("Failed to open URL in the browser.".into())
        }
    }
}

#[tauri::command]
pub fn send_via_signal(app: tauri::AppHandle, message: String) -> Result<SendResponse, String> {
    let encoded_message = form_urlencoded::byte_serialize(message.as_bytes()).collect::<String>();
    let url = format!("signal://?text={}", encoded_message); // Use Signal's URL scheme

       // Try to open Instagram Direct, use clipboard as fallback
       #[cfg(target_os = "android")]
       {
           // On Android, just return the URL to open Instagram Direct
           Ok(SendResponse {
               platform: "mobile".into(),
               url: url.to_string(),
           })
       }
   
       #[cfg(target_os = "ios")]
       {
           // On iOS, just return the URL to open Instagram Direct
           Ok(SendResponse {
               platform: "mobile".into(),
               url: url.to_string(),
           })
       }
   
       #[cfg(not(any(target_os = "android", target_os = "ios")))]
       {
           // For desktop environments, try to open the URL in the browser
           if webbrowser::open(&url).is_ok() {
               // Attempt to copy the message to clipboard
               if app.clipboard().write_text(message.clone()).is_ok() {
                   return Ok(SendResponse {
                       platform: "desktop".into(),
                       url: url.to_string(),
                   });
               } else {
                   return Err("Failed to copy the message to the clipboard.".into());
               }
           } else {
               // If opening Instagram fails, attempt to copy the message to clipboard
               if app.clipboard().write_text(message.clone()).is_ok() {
                   Err(format!("Instagram failed to open, but the message was copied to clipboard: {}", message))
               } else {
                   Err("Failed to open Instagram and copy the message to the clipboard.".into())
               }
           }
       }
}