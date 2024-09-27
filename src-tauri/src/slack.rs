use url::form_urlencoded;
use webbrowser;

#[derive(serde::Serialize)]
pub struct SendResponse {
    platform: String,
    url: String,
}

#[tauri::command]
pub fn send_via_slack(message: String) -> Result<SendResponse, String> {
    // URL-encode the message
    let encoded_message = form_urlencoded::byte_serialize(message.as_bytes()).collect::<String>();

    // Construct the Slack URL (for demo purposes, use a Slack Webhook URL in a real application)
    let url = format!("https://slack.com/api/chat.postMessage?text={}", encoded_message);

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
