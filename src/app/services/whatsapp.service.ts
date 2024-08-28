import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  constructor(private router: Router) {}

  async sendViaWhatsapp( message: string): Promise<any> {
    try {
      const response = await invoke('send_via_whatsapp', { message });
      // Handle success response if needed
      console.log('Message sent successfully!');
      return response;
    } catch (err) {
      // Handle error response
      console.error('Failed to send message:', err);
      throw err;
    }
  }

  inappWhatsapp(phone_number: string, message: string) {
    this.router.navigate(['/whatsapp'], { queryParams: { phone_number, message } });
  }
}
