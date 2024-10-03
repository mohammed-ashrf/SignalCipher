import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { open } from '@tauri-apps/plugin-dialog';

@Component({
  selector: 'app-local-send',
  templateUrl: './local-send.component.html',
  styleUrls: ['./local-send.component.css']
})
export class LocalSendComponent implements OnInit {
  devices: any[] = [];
  selectedDevice: any = null;
  messageText: string = '';
  selectedFilePath: string | null = null;
  loading: boolean = false;

  constructor( private networkService: NetworkService) {}
  ngOnInit(): void {
    this.networkService.discoverDevices();
  }

  // Discover devices
  discoverDevices() {
    this.loading = true;
    this.networkService.discoverDevices()
      .then((discoveredDevices: any[]) => {
        this.loading = false;
        this.devices = discoveredDevices;
        console.log(this.devices);
      })
      .catch((err) => {
        console.error('Error discovering devices:', err);
      });
  }

  // Select device for communication
  selectDevice(device: any) {
    this.selectedDevice = device;
  }

  // Send a text message
  sendMessage() {
    if (this.selectedDevice && this.messageText) {
      this.networkService.sendMessage ( this.selectedDevice.ip, this.messageText )
      .then(() => {
        alert('Message sent!');
      })
      .catch((err) => {
        console.error('Error sending message:', err);
      });
    }
  }

  // Open file dialog to select a file
  async selectFile() {
    const selected = await open({
      multiple: true,
    });

    if (typeof selected === 'string') {
      this.selectedFilePath = selected;
    } else {
      alert('No file selected!');
    }
  }

  // Send a file
  sendFile() {
    if (this.selectedDevice && this.selectedFilePath) {
      this.networkService.sendFile( this.selectedDevice.ip, this.selectedFilePath )
      .then(() => {
        alert('File sent!');
      })
      .catch((err) => {
        console.error('Error sending file:', err);
      });
    }
  }
}
