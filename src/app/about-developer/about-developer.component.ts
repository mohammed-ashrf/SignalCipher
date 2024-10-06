import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-about-developer',
  templateUrl: './about-developer.component.html',
  styleUrls: ['./about-developer.component.css']
})
export class AboutDeveloperComponent implements OnInit {
  language: string = 'en';
  ngOnInit(): void {
    let storedLanguage = window.localStorage.getItem('lang');
    if (storedLanguage) {
      this.language = storedLanguage;
    }
    this.updateTextDirection();
  }

  updateDirection(event: any) {
    this.language = event.target.value;
    window.localStorage.setItem('lang', this.language);
    this.updateTextDirection();
  }
  private updateTextDirection() {
    let cipherContainer = document.getElementsByClassName('developer-container')[0];
    if (this.language === 'ar') {
      cipherContainer.setAttribute('dir', 'rtl');
    } else {
      cipherContainer.setAttribute('dir', 'ltr');
    }
  }
}
