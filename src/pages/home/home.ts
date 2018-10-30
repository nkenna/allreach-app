import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { LocatePage } from '../locate/locate';
import { AboutPage } from '../about/about';
import { CalloutPage } from '../callout/callout';
import { DonatePage } from '../donate/donate';
import { ReportPage } from '../report/report';
import { EventsPage } from '../events/events';
import {Storage} from "@ionic/storage";
import { SigninPage } from '../signin/signin';
import { AskhelphomePage } from '../askhelphome/askhelphome';
import { AskhelpPage } from '../askhelp/askhelp';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any;
  auth: boolean = false;
  num_donations: any = 0;

  constructor(private localNotification: PhonegapLocalNotification, private toastCtrl: ToastController, public navCtrl: NavController, private storage: Storage) {
    storage.ready().then(() => {
    this.storage.get('user').then((user)=>{
      this.user = user;
    });
  });

  if (this.user == null){
    this.auth = false;
  }else{
    this.auth = true;
    this.num_donations = this.user.num_donations;
  }

  
    
    //this.storage.set('profile', this.main_data['user']);

    this.localNotification.requestPermission().then(
      (permission) => {
        if (permission === 'granted') {
    
          // Create the notification
          this.localNotification.create('vvvv', {
            tag: 'message1',
            body: 'My body',
            icon: 'assets/icon/favicon.ico'
          });
    
        }
      }
    );
     

  }

  locatePage(){
    this.navCtrl.push(LocatePage);
  }

  aboutPage(){
    this.navCtrl.push(AboutPage);
  }

  calloutPage(){
    this.navCtrl.push(CalloutPage);
  }

  donatePage(){
    this.navCtrl.push(DonatePage);
  }

  reportPage(){
    this.navCtrl.push(ReportPage);
  }

  eventsPage(){
    //this.navCtrl.push(EventsPage);
    this.presentToast('coming soon')
  }

  signin(){
    this.navCtrl.push(SigninPage)
  } 

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
      
    });

    toast.present();
  }

}
