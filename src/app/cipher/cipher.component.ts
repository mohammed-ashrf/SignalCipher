import { Component } from '@angular/core';
import { CipherService } from '../services/cipher.service';
import { WhatsappService } from '../services/whatsapp.service';
import { TelegramService } from '../services/telegram.service';
@Component({
  selector: 'app-cipher',
  templateUrl: './cipher.component.html',
  styleUrls: ['./cipher.component.css']
})
export class CipherComponent{
  message: string = '';
  c_key: number = 0;
  v_key: string = '';
  result: string = '';
  language: string = 'en';

  constructor(private cipherService: CipherService, 
    private whatsappService: WhatsappService,
    private telegramService: TelegramService
  ) {
    this.updateTextDirection();
  }

  cipherText_c(encrypt: boolean) {
    this.cipherService.cipherText_c(this.message, this.c_key, encrypt, this.language).then(result => {
      this.result = result;
      this.updateTextDirection();
    }).catch(error => {
      console.error('Error during cipher operation:', error);
    });
  }

  cipherText_v(encrypt: boolean) {
    this.cipherService.cipherText_v(this.message.trim(), this.v_key, encrypt, this.language).then(result => {
      this.result = result;
      this.updateTextDirection();
    }).catch(error => {
      console.error('Error during cipher operation:', error);
    });
  }


  sendMessageViaWhatsapp() {
    // Determine message to send
    const message = this.result;
    if (!message) {
      alert('No message to send.');
      return;
    }

    this.whatsappService.sendViaWhatsapp( message)
      .then(() => console.log("sending message"))
      .catch(err => alert(`Failed to send message: ${err}`));
  }

  sendMessageViaTelegram() {
    // Determine message to send
    const message = this.result;
    if (!message) {
      alert('No message to send.');
      return;
    }

    this.telegramService.sendViaWhatsapp( message)
      .then(() => console.log("sending message"))
      .catch(err => alert(`Failed to send message: ${err}`));
  }

  updateDirection(event: any) {
    this.language = event.target.value;
    this.updateTextDirection();
  }
  private updateTextDirection() {
    if (this.language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }
}
