import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinaryConverterComponent } from './binary-converter/binary-converter.component';
import { MorseCodeTranslatorComponent } from './morse-code-translator/morse-code-translator.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { CipherComponent } from './cipher/cipher.component';
import { LocalSendComponent } from './local-send/local-send.component';

const routes: Routes = [
  { path:'', redirectTo: '/cipher', pathMatch: "full" },
  { path: 'binary', component: BinaryConverterComponent },
  { path: 'morse', component: MorseCodeTranslatorComponent },
  { path: 'cipher', component: CipherComponent },
  { path: 'whatsapp', component: WhatsappComponent },
  { path: 'localsend', component: LocalSendComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
