import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Storage} from "@ionic/storage";

import { SigninPage } from '../signin/signin';
import { AlertController } from 'ionic-angular';
import { DonatePage } from '../donate/donate';
import { DonaterPage } from '../donater/donater';

/**
 * Generated class for the ReachhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reachhome',
  templateUrl: 'reachhome.html',
})
export class ReachhomePage {
  home: any;
  user: any;
  auth: boolean = false;

  num_donations: any = 0; 

  constructor(private toastCtrl: ToastController, public alertCtrl: AlertController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
   
    this.home = this.navParams.get('h');
    
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

   
    console.log(this.home.title);



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReachhomePage');

  if(this.auth){
    
  }else{
    setInterval(()=>{
      this.presentToast('Login to Donate')
    }, 5000)
  }
   
  }

  call(item){

  }

  signin(){
    this.navCtrl.push(SigninPage)
  } 

  donate(){
    this.showDonateAlert(this.user);
  }

  showDonateAlert(user) {
    const confirm = this.alertCtrl.create({
      title: 'Do you agree?',
      message: 'Do you agree to move to another page where your donations details/data will be requested  ?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.navCtrl.push(DonatePage, {user: user}); 
          }
        }
      ]
    });
    confirm.present();
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
      
    });

    toast.present();
  }

}
