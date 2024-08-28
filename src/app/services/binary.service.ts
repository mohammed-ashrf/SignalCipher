import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

@Injectable({
  providedIn: 'root'
})
export class BinaryService {

  async binaryToText(binary: string): Promise<string> {
    return await invoke('binary_to_text', { binary });
  }

  async textToBinary(text: string): Promise<string> {
    return await invoke('text_to_binary', { text });
  }
}
