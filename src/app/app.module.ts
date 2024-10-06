import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BinaryConverterComponent } from './binary-converter/binary-converter.component';
import { MorseCodeTranslatorComponent } from './morse-code-translator/morse-code-translator.component';
import { HeaderComponent } from './header/header.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { CipherComponent } from './cipher/cipher.component';
import { LocalSendComponent } from './local-send/local-send.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AboutDeveloperComponent } from './about-developer/about-developer.component';

@NgModule({
  declarations: [
    AppComponent,
    BinaryConverterComponent,
    MorseCodeTranslatorComponent,
    HeaderComponent,
    WhatsappComponent,
    CipherComponent,
    LocalSendComponent,
    AboutDeveloperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
