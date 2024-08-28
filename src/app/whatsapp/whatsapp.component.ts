import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent {
  whatsappUrl!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const phone_number = params['phone_number'];
      const message = params['message'];
      const encodedMessage = encodeURIComponent(message);
      this.whatsappUrl = `https://api.whatsapp.com/send?phone=${phone_number}&text=${encodedMessage}`;
    });
  }

}
