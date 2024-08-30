import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
@Injectable({
  providedIn: 'root'
})
export class CipherService {

  constructor() { }
  
  cipherText_c(text: string, key: number, encrypt: boolean, language: string): Promise<string> {
    return invoke<string>('cipher_c_command', { text, key, encrypt, language });
  }

  cipherText_v(text: string, key: string, encrypt: boolean, language: string): Promise<string> {
    return invoke<string>('cipher_v_command', { text, key, encrypt, language });
  }
}
