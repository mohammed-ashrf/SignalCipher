import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  constructor() { }
  async sendViaWhatsapp( message: string): Promise<any> {
    try {
      const response = await invoke('send_via_telegram', { message });
      // Handle success response if needed
      console.log('Message sent successfully!');
      return response;
    } catch (err) {
      // Handle error response
      console.error('Failed to send message:', err);
      throw err;
    }
  }
}
