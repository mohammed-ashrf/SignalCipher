import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BinaryConverterComponent } from './binary-converter/binary-converter.component';
import { MorseCodeTranslatorComponent } from './morse-code-translator/morse-code-translator.component';
import { HeaderComponent } from './header/header.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';

@NgModule({
  declarations: [
    AppComponent,
    BinaryConverterComponent,
    MorseCodeTranslatorComponent,
    HeaderComponent,
    WhatsappComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
