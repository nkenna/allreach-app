import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonaterPage } from './donater';

@NgModule({
  declarations: [
    DonaterPage,
  ],
  imports: [
    IonicPageModule.forChild(DonaterPage),
  ],
})
export class DonaterPageModule {}
