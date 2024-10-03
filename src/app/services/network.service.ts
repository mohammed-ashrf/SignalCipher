import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

interface Device {
  ip: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  devices: Device[] = [];
  loading!: boolean;

  constructor() {}

  async discoverDevices(): Promise<Device[]> {
    this.loading = true;
    try {
      this.devices = await invoke('discover_devices');
      if (this.devices.length > 0) {
        console.log('Devices discovered:', this.devices);
      } else {
        console.warn('No devices found.');
      }
      return this.devices;
    } catch (err) {
      console.error('Device discovery failed:', err);
      alert('Failed to discover devices. Please try again.'); // User feedback
      return [];
    } finally {
      this.loading = false;
    }
  }
  

  // Send a text message to the selected device
  async sendMessage(ip: string, text: string): Promise<void> {
    try {
      await invoke('send_message_to_device', { ip, message: text });
      console.log('Message sent successfully');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  }

  // Send a file to the selected device
  async sendFile(ip: string, filePath: string): Promise<void> {
    try {
      await invoke('send_file_to_device', { ip, filePath });
      console.log('File sent successfully');
    } catch (err) {
      console.error('Failed to send file:', err);
    }
  }
  async serverUp() {
    try {
      await invoke('server_up');
      console.log('server is Up');
    } catch (err) {
      console.error('Failed to create the server');
    }
  }

  advertiseService() {
    invoke('advertise_service')
      .then((result: any) => {
        console.log('Service advertised successfully:', result);
        // Handle success, show a message to the user
      })
      .catch((error: any) => {
        console.error('Failed to advertise service:', error);
        // Handle error, show an error message to the user
      });
  }
}
