import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdatesService {
  private currentVersion: string = '0.1.0';
  private versionUrl = 'https://signalcipher.vercel.app/assets/version.json';

  constructor(private http: HttpClient,private snackBar: MatSnackBar) { }
  // Fetch the version info from the hosted version.json file
  fetchVersionInfo(): Observable<any> {
    return this.http.get<any>(this.versionUrl);
  }

  // Compare current version with the latest version
  isNewerVersion(latestVersion: string): boolean {
    const latestParts = latestVersion.split('.').map(Number);
    const currentParts = this.currentVersion.split('.').map(Number);

    for (let i = 0; i < latestParts.length; i++) {
      if (latestParts[i] > (currentParts[i] || 0)) {
        return true;
      } else if (latestParts[i] < (currentParts[i] || 0)) {
        return false;
      }
    }

    return false;
  }

  // Notify the user if there is a newer version
  checkForUpdates(): void {
    this.fetchVersionInfo().subscribe(
      (data) => {
        const latestVersion = data.version;
        if (this.isNewerVersion(latestVersion)) {
          const downloadUrl = data.download_url;
          this.notifyUser(latestVersion, downloadUrl);
        }
      },
      (error) => {
        console.error('Error fetching version info:', error);
      }
    );
  }

  notifyUser(latestVersion: string, downloadUrl: string): void {
    if (confirm(`A new version (${latestVersion}) is available. Do you want to visit the download page?`)) {
      window.open(downloadUrl, '_blank');
    }    
  }

  notifyUserSnakBar(latestVersion: string, downloadUrl: string): void {
    this.snackBar.open(`A new version (${latestVersion}) is available.`, 'Download', {
      duration: 10000,
    }).onAction().subscribe(() => {
      window.open(downloadUrl, '_blank');
    });
  }
}
