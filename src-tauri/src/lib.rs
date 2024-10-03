mod binary;
mod morse;
mod whatsapp;
mod telegram;
mod cipher;
mod slack;
mod local_send;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
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
      local_send::send_message_to_device,
      local_send::send_file_to_device,
      local_send::discover_devices,
      local_send::server_up,
      local_send::advertise_service
    ])
    .plugin(tauri_plugin_shell::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
