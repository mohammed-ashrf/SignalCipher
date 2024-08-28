import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

@Injectable({
  providedIn: 'root'
})
export class MorseCodeService {
  async morseToText(morse: string): Promise<string> {
    return await invoke('morse_to_text', { morse });
  }

  async textToMorse(text: string): Promise<string> {
    return await invoke('text_to_morse', { text });
  }
}
