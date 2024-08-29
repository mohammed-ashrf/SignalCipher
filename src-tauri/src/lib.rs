mod binary;
mod morse;
mod whatsapp;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      binary::binary_to_text,
      binary::text_to_binary,
      morse::morse_to_text,
      morse::text_to_morse,
      whatsapp::send_via_whatsapp
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
