import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Storage} from "@ionic/storage";
import { AlertController } from 'ionic-angular';

import { LocatePage } from '../locate/locate';
import { DonaterPage } from '../donater/donater';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  user4rmStore: any;
  user4rmNav: any; 
  num_donations: any;
  auth: any;

  donationDatas: Array<any>;
  error_ms: any;

  constructor(public alertCtrl: AlertController, private toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    this.user4rmNav = this.navParams.get('user');
    
     storage.ready().then(() => {
      this.storage.get('user').then((user)=>{
        this.user4rmStore = user;
      });
    });
  
    if (this.user4rmStore == null){
      this.auth = false;
      this.num_donations = this.user4rmNav.num_donations;
    }else{
      this.auth = true;
      this.num_donations = this.user4rmStore.num_donations;
    }

    this.collectDonationHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  async collectDonationHistory(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    await this.http.get('http://localhost:3000/api/userdonations?userid=' + this.user4rmNav._id)
    .subscribe((data: any) =>{
      loading.dismiss();
      console.log(900);
      this.donationDatas = data.donations;
      this.num_donations = data.count;
      console.log(this.donationDatas);
    }, (error: any) =>{
      loading.dismiss();
      console.log(error);
      this.error_ms = 'error retrieving data'
      this.presentToast(this.error_ms);
    }, ()=>{
      loading.dismiss();
      console.log(this.donationDatas);
      if (this.donationDatas == null){
        this.error_ms = 'no data retrieved'
        this.presentToast(this.error_ms);
      }
    })
    
  }

  donateRandomly(user){
    this.showDonateRPrompt(user);
  }

  donate(user){
    this.navCtrl.push(DonaterPage , {user: user}); 
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      
      
    });

    toast.present();
  }

 

  showDonateRPrompt(user) {
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
            this.navCtrl.push(DonaterPage , {user: user}); 
          }
        }
      ]
    });
    confirm.present();
  }
   

}
