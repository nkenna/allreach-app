import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalloutPage } from './callout';

@NgModule({
  declarations: [
    CalloutPage,
  ],
  imports: [
    IonicPageModule.forChild(CalloutPage),
  ],
})
export class CalloutPageModule {}
