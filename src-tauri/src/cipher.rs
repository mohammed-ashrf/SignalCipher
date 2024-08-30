fn caesar_cipher(text: &str, key: i32, encrypt: bool) -> String {
    let shift = if encrypt { key } else { -key };
    text.chars()
        .map(|c| {
            if c.is_ascii_alphabetic() {
                let a = if c.is_uppercase() { 'A' } else { 'a' } as u8;
                let shifted = (c as u8 - a + shift as u8) % 26 + a;
                shifted as char
            } else {
                c
            }
        })
        .collect()
}

fn cipher_unicode(text: &str, key: i32, encrypt: bool) -> String {
    let shift = if encrypt { key } else { -key };
    text.chars()
        .map(|c| {
            let shifted = (c as u32 as i32 + shift).rem_euclid(0x10FFFF);
            std::char::from_u32(shifted as u32).unwrap_or(c)
        })
        .collect()
}

#[tauri::command]
pub fn cipher_c_command(text: String, key: i32, encrypt: bool, language: String) -> String {
    // Call your ciphering function here
    if language == "ar" {
        cipher_unicode(&text, key, encrypt)
    } else {
        caesar_cipher(&text, key, encrypt)
    }
}

fn vigenere_cipher(text: &str, key: &str, encrypt: bool) -> String {
    let key_bytes = key.as_bytes();
    let key_len = key_bytes.len();
    text.chars()
        .enumerate()
        .map(|(i, c)| {
            if c.is_ascii_alphabetic() {
                let a = if c.is_uppercase() { b'A' } else { b'a' };
                let shift = if encrypt {
                    (key_bytes[i % key_len] as i8 - a as i8) as i8
                } else {
                    -(key_bytes[i % key_len] as i8 - a as i8) as i8
                };
                let shifted = ((c as u8 - a + shift as u8) % 26) + a;
                shifted as char
            } else {
                c
            }
        })
        .collect()
}


fn vigenere_cipher_unicode(text: &str, key: &str, encrypt: bool) -> String {
    let key_chars: Vec<_> = key.chars().collect();
    let key_len = key_chars.len();
    text.chars()
        .enumerate()
        .map(|(i, c)| {
            let shift = if encrypt {
                key_chars[i % key_len] as i32
            } else {
                -(key_chars[i % key_len] as i32)
            };
            let shifted = (c as u32 as i32 + shift).rem_euclid(0x10FFFF);
            std::char::from_u32(shifted as u32).unwrap_or(c)
        })
        .collect()
}


#[tauri::command]
pub fn cipher_v_command(text: String, key: String, encrypt: bool, language: String) -> String {
    if language == "ar" {
        vigenere_cipher_unicode(&text, &key, encrypt)
    } else {
        vigenere_cipher(&text, &key, encrypt)
    }
}