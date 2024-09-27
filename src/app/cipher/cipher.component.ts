import { Component, OnInit } from '@angular/core';
import { CipherService } from '../services/cipher.service';
import { WhatsappService } from '../services/whatsapp.service';
import { TelegramService } from '../services/telegram.service';
@Component({
  selector: 'app-cipher',
  templateUrl: './cipher.component.html',
  styleUrls: ['./cipher.component.css']
})
export class CipherComponent implements OnInit{
  message: string = '';
  c_key: number = 0;
  v_key: string = '';
  result: string = '';
  language: string = 'en';

  constructor(private cipherService: CipherService, 
    private whatsappService: WhatsappService,
    private telegramService: TelegramService
  ) {
  }
  ngOnInit(): void {
    let storedLanguage = window.localStorage.getItem('lang');
    if (storedLanguage) {
      this.language = storedLanguage;
    }
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

    this.telegramService.sendViaTelegram( message)
      .then(() => console.log("sending message"))
      .catch(error => alert(`Failed to send message: ${error}`));
  }

  updateDirection(event: any) {
    this.language = event.target.value;
    window.localStorage.setItem('lang', this.language);
    this.updateTextDirection();
  }
  private updateTextDirection() {
    let cipherContainer = document.getElementsByClassName('cipher-container')[0];
    if (this.language === 'ar') {
      cipherContainer.setAttribute('dir', 'rtl');
    } else {
      cipherContainer.setAttribute('dir', 'ltr');
    }
  }
}
