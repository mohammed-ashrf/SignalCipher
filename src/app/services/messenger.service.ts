import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { Router } from '@angular/router';
import { open } from '@tauri-apps/plugin-shell';
@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  constructor(private router: Router) {}

  async sendViaMessenger(message: string): Promise<any> {
    try {
      const response = await invoke('send_via_messenger', { message });
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

  async sendViaInstagram(message: string): Promise<any> {
    try {
      const response = await invoke('send_via_instagram', { message });
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

  async sendViaLine(message: string): Promise<any> {
    try {
      const response = await invoke('send_via_line', { message });
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
}
