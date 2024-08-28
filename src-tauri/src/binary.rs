#[tauri::command]
pub fn binary_to_text(binary: String) -> String {
    let binary_values = binary.split(' ').collect::<Vec<&str>>();
    let mut text = String::new();
    for binary_value in binary_values {
        let char_code = u8::from_str_radix(binary_value, 2).unwrap();
        text.push(char::from(char_code));
    }
    text
}

#[tauri::command]
pub fn text_to_binary(text: String) -> String {
    let mut binary_string = String::new();
    for c in text.chars() {
        binary_string.push_str(&format!("{:08b} ", c as u8));
    }
    binary_string.trim().to_string()
}
