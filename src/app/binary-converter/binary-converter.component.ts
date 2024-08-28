import { Component } from '@angular/core';
import { BinaryService } from '../services/binary.service';
import { WhatsappService } from '../services/whatsapp.service';
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

  constructor(private binaryService: BinaryService, private whatsappService: WhatsappService) {}

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

  sendMessage() {
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
}
