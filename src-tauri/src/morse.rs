use std::collections::HashMap;
use lazy_static::lazy_static;

// Combined Morse code dictionary
lazy_static! {
    static ref COMBINED_MORSE_CODE_DICT: HashMap<&'static str, char> = {
        let mut map = HashMap::new();

        // English Morse code
        map.insert(".-", 'A');
        map.insert("-...", 'B');
        map.insert("-.-.", 'C');
        map.insert("-..", 'D');
        map.insert(".", 'E');
        map.insert("..-.", 'F');
        map.insert("--.", 'G');
        map.insert("....", 'H');
        map.insert("..", 'I');
        map.insert(".---", 'J');
        map.insert("-.-", 'K');
        map.insert(".-..", 'L');
        map.insert("--", 'M');
        map.insert("-.", 'N');
        map.insert("---", 'O');
        map.insert(".--.", 'P');
        map.insert("--.-", 'Q');
        map.insert(".-.", 'R');
        map.insert("...", 'S');
        map.insert("-", 'T');
        map.insert("..-", 'U');
        map.insert("...-", 'V');
        map.insert(".--", 'W');
        map.insert("-..-", 'X');
        map.insert("-.--", 'Y');
        map.insert("--..", 'Z');
        map.insert("-----", '0');
        map.insert(".----", '1');
        map.insert("..---", '2');
        map.insert("...--", '3');
        map.insert("....-", '4');
        map.insert(".....", '5');
        map.insert("-....", '6');
        map.insert("--...", '7');
        map.insert("---..", '8');
        map.insert("----.", '9');
        map.insert(".-.-.-", '.');
        map.insert("--..--", ',');
        map.insert("..--..", '?');
        map.insert(".----.", '\'');
        map.insert("-.-.--", '!');
        map.insert("-..-.", '/');
        map.insert("-.--.", '(');
        map.insert("-.--.-", ')');
        map.insert(".-...", '&');
        map.insert("---...", ':');
        map.insert("-.-.-.", ';');
        map.insert("-...-", '=');
        map.insert(".-.-.", '+');
        map.insert("-....-", '-');
        map.insert("..--.-", '_');
        map.insert(".-..-.", '"');
        map.insert("...-..-", '$');
        map.insert(".--.-.", '@');
        
        map
    };
}

// Utility function to convert Morse code to text
#[tauri::command]
pub fn morse_to_text(morse: String) -> String {
    let dictionary = &COMBINED_MORSE_CODE_DICT;

    morse.split(" / ") // Split words by " / " for spaces between words
        .map(|word| {
            word.split_whitespace() // Split characters within each word
                .filter_map(|code| dictionary.get(code)) // Convert Morse code to characters
                .collect::<String>()
        })
        .collect::<Vec<String>>()
        .join(" ") // Join words with a space
}

// Utility function to convert text to Morse code
#[tauri::command]
pub fn text_to_morse(text: String) -> String {
    let dictionary = &COMBINED_MORSE_CODE_DICT;

    let mut morse_code = String::new();
    
    for c in text.chars() {
        if c.is_whitespace() {
            morse_code.push_str(" / "); // Use " / " to separate words
        } else {
            let code = dictionary.iter().find_map(|(key, &val)| {
                if val == c.to_ascii_uppercase() {
                    Some(*key)
                } else {
                    None
                }
            });

            match code {
                Some(morse) => {
                    morse_code.push_str(morse);
                    morse_code.push(' ');
                },
                None => {
                    morse_code.push(c); // Preserve characters not in Morse code dictionary
                    morse_code.push(' ');
                }
            }
        }
    }
    
    morse_code.trim_end().to_string() // Trim the trailing space
}