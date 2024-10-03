use url::form_urlencoded;
use webbrowser;
use tauri_plugin_clipboard_manager::ClipboardExt;

#[derive(serde::Serialize)]
pub struct SendResponse {
    platform: String,
    url: String,
}

#[tauri::command]
pub fn send_via_messenger(app: tauri::AppHandle, message: String) -> Result<SendResponse, String> {
    // Open Messenger with a URL to initiate a new message
    let encoded_message = form_urlencoded::byte_serialize(message.as_bytes()).collect::<String>();
    let url = format!("https://m.me/?link={}", encoded_message);

    // Try to open Messenger with the URL, use clipboard as fallback
    #[cfg(target_os = "android")]
    {
        // On Android, return the URL to open Messenger
        Ok(SendResponse {
            platform: "mobile".into(),
            url: url.to_string(),
        })
    }

    #[cfg(target_os = "ios")]
    {
        // On iOS, return the URL to open Messenger
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
            // If opening Messenger fails, attempt to copy the message to clipboard
            if app.clipboard().write_text(message.clone()).is_ok() {
                Err(format!("Messenger failed to open, but the message was copied to clipboard: {}", message))
            } else {
                Err("Failed to open Messenger and copy the message to the clipboard.".into())
            }
        }
    }
}

#[tauri::command]
pub fn send_via_instagram(app: tauri::AppHandle, message: String) -> Result<SendResponse, String> {
    // Open Instagram Direct messaging interface
    let encoded_message = url::form_urlencoded::byte_serialize(message.as_bytes()).collect::<String>();
    let url = format!("https://www.instagram.com/direct/new/?text={}", encoded_message); // Open Instagram Direct

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