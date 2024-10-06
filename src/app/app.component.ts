import { Component } from '@angular/core';
import { CheckForUpdatesService } from './services/check-for-updates.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'decoder';
  constructor(private checkForUpdatesService: CheckForUpdatesService) {
    this.checkForUpdatesService.checkForUpdates();
  }
}
