import { Component } from '@angular/core';
import { MorseCodeService } from '../services/morse-code.service';
import { WhatsappService } from '../services/whatsapp.service';
import { TelegramService } from '../services/telegram.service';
import { MessengerService } from '../services/messenger.service';
@Component({
  selector: 'app-morse-code-translator',
  templateUrl: './morse-code-translator.component.html',
  styleUrls: ['./morse-code-translator.component.css']
})
export class MorseCodeTranslatorComponent {
  morseInput: string = '';
  textInput: string = '';
  textOutput: string = '';
  morseOutput: string = '';
  currentView: string = 'textToMorse'; // Default view
  language: string = "en"

  constructor(private morseCodeService: MorseCodeService, 
    private whatsappService: WhatsappService, 
    private telegramService: TelegramService,
    private messengerService: MessengerService
  ) {}

  showView(view: string) {
    this.currentView = view;
  }

  translateToText() {
    this.morseCodeService.morseToText(this.morseInput).then(result => {
      this.textOutput = result;
    });
  }

  translateToMorse() {
    this.morseCodeService.textToMorse(this.textInput).then(result => {
      this.morseOutput = result;
    });
  }

  sendMessageViaWhatsapp() {
    // Determine message to send
    const message = this.currentView === 'binaryToText' ? this.textOutput : this.morseOutput;
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
    const message = this.currentView === 'binaryToText' ? this.textOutput : this.morseOutput;
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
    const message = this.currentView === 'binaryToText' ? this.textOutput : this.morseOutput;
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
    const message = this.currentView === 'binaryToText' ? this.textOutput : this.morseOutput;
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
    const message = this.currentView === 'binaryToText' ? this.textOutput : this.morseOutput;
    if (!message) {
      alert('No message to send.');
      return;
    }

    this.messengerService.sendViaLine( message)
      .then(() => console.log("sending message"))
      .catch(error => alert(`Failed to send message: ${error}`));
  }
}
