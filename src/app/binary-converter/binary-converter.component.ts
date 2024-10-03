import { Component } from '@angular/core';
import { BinaryService } from '../services/binary.service';
import { WhatsappService } from '../services/whatsapp.service';
import { TelegramService } from '../services/telegram.service';
import { MessengerService } from '../services/messenger.service';
@Component({
  selector: 'app-binary-converter',
  templateUrl: './binary-converter.component.html',
  styleUrls: ['./binary-converter.component.css']
})
export class BinaryConverterComponent {
  binaryInput: string = '';
  textInput: string = '';
  textOutput: string = '';
  binaryOutput: string = '';
  currentView: string = 'textToBinary';
  language: string = 'en';

  constructor(private binaryService: BinaryService, 
    private whatsappService: WhatsappService,
    private telegramService: TelegramService,
    private messengerService: MessengerService
  ) {}

  showView(view: string) {
    this.currentView = view;
  }

  translateToText() {
    this.binaryService.binaryToText(this.binaryInput).then(result => {
      this.textOutput = result;
    });
  }

  translateToBinary() {
    this.binaryService.textToBinary(this.textInput).then(result => {
      this.binaryOutput = result;
    });
  }

  sendMessageViaWhatsapp() {
    // Determine message to send
    const message = this.currentView === 'binaryToText' ? this.textOutput : this.binaryOutput;
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
    const message = this.currentView === 'binaryToText' ? this.textOutput : this.binaryOutput;
    if (!message) {
      alert('No message to send.');
      return;
    }

    this.telegramService.sendViaTelegram( message)
      .then(() => console.log("sending message"))
      .catch(err => alert(`Failed to send message: ${err}`));
  }

  sendMessageViaMessenger() {
    // Determine message to send
    const message = this.currentView === 'binaryToText' ? this.textOutput : this.binaryOutput;
    if (!message) {
      alert('No message to send.');
      return;
    }

    this.messengerService.sendViaMessenger( message)
      .then(() => console.log("sending message"))
      .catch(error => alert(`Failed to send message: ${error}`));
  }

  sendMessageViaInstagram() {
    // Determine message to send
    const message = this.currentView === 'binaryToText' ? this.textOutput : this.binaryOutput;
    if (!message) {
      alert('No message to send.');
      return;
    }

    this.messengerService.sendViaInstagram( message)
      .then(() => console.log("sending message"))
      .catch(error => alert(`Failed to send message: ${error}`));
  }
  sendMessageViaLine() {
    // Determine message to send
    const message = this.currentView === 'binaryToText' ? this.textOutput : this.binaryOutput;
    if (!message) {
      alert('No message to send.');
      return;
    }

    this.messengerService.sendViaLine( message)
      .then(() => console.log("sending message"))
      .catch(error => alert(`Failed to send message: ${error}`));
  }
}
