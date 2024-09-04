import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { Router } from '@angular/router';
import { open } from '@tauri-apps/plugin-shell';
@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  constructor(private router: Router) {}

  async sendViaWhatsapp(message: string): Promise<any> {
    try {
      const response = await invoke('send_via_whatsapp', { message });
      const { platform, url } = response as { platform: string, url: string };

      if (platform === 'mobile') {
        // Handle mobile platform - open URL or use it as needed
        await open(url.toString());
      } else if (platform === 'desktop') {
        // Handle desktop platform
        console.log('URL opened in the browser');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  inappWhatsapp(phone_number: string, message: string) {
    this.router.navigate(['/whatsapp'], { queryParams: { phone_number, message } });
  }  
}
