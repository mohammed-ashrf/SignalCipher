use webbrowser;
use url::form_urlencoded;

#[derive(serde::Serialize)]
pub struct SendResponse {
    platform: String,
    url: String,
}

#[tauri::command]
pub fn send_via_whatsapp(message: String) -> Result<SendResponse, String> {
    let encoded_message = form_urlencoded::byte_serialize(message.as_bytes()).collect::<String>();
    let url = format!("https://api.whatsapp.com/send?text={}", encoded_message);

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