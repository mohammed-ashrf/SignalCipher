mod binary;
mod morse;
mod whatsapp;
mod telegram;
mod cipher;
mod slack;
mod messanger;
mod line;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_clipboard_manager::init())
    .invoke_handler(tauri::generate_handler![
      binary::binary_to_text,
      binary::text_to_binary,
      morse::morse_to_text,
      morse::text_to_morse,
      whatsapp::send_via_whatsapp,
      telegram::send_via_telegram,
      slack::send_via_slack,
      cipher::cipher_c_command,
      cipher::cipher_v_command,
      messanger::send_via_messenger,
      messanger::send_via_instagram,
      line::send_via_line,
      line::send_via_signal
    ])
    .plugin(tauri_plugin_shell::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
