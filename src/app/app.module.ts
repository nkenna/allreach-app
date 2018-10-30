import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LocatePage } from '../pages/locate/locate';
import { AboutPage } from '../pages/about/about';
import { CalloutPage } from '../pages/callout/callout';
import { DonatePage } from '../pages/donate/donate';
import { DonaterPage } from '../pages/donater/donater';
import { ReportPage } from '../pages/report/report';
import { EventsPage } from '../pages/events/events';
import { ReachhomePage } from '../pages/reachhome/reachhome';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { UserPage } from '../pages/user/user';
import { AskhelphomePage } from '../pages/askhelphome/askhelphome';
import { AskhelpPage } from '../pages/askhelp/askhelp';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LocatePage,
    AboutPage,
    CalloutPage,
    DonatePage,
    ReportPage,
    EventsPage,
    ReachhomePage,
    SigninPage,
    SignupPage,
    UserPage,
    DonaterPage,
    AskhelphomePage,
    AskhelpPage   

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LocatePage,
    AboutPage,
    CalloutPage,
    DonatePage,
    ReportPage,
    EventsPage,
    ReachhomePage,
    SigninPage,
    SignupPage,
    UserPage,
    DonaterPage,
    AskhelphomePage,
    AskhelpPage   
  ],
  providers: [
    PhonegapLocalNotification,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
