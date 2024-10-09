import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinaryConverterComponent } from './binary-converter/binary-converter.component';
import { MorseCodeTranslatorComponent } from './morse-code-translator/morse-code-translator.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { CipherComponent } from './cipher/cipher.component';
import { AboutDeveloperComponent } from './about-developer/about-developer.component';

const routes: Routes = [
  { path:'', redirectTo: '/cipher', pathMatch: "full" },
  { path: 'binary', component: BinaryConverterComponent },
  { path: 'morse', component: MorseCodeTranslatorComponent },
  { path: 'cipher', component: CipherComponent },
  { path: 'whatsapp', component: WhatsappComponent },
  { path: 'about-developer', component: AboutDeveloperComponent },
  { path: '**', redirectTo: '/cipher' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
