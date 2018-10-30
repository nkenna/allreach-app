import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController,  AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Storage} from "@ionic/storage";
import * as moment from 'moment';

/**
 * Generated class for the AskhelphomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-askhelphome',
  templateUrl: 'askhelphome.html',
})
export class AskhelphomePage {
  user: any;
  auth: boolean = false;

  

  num_donations: any = 0;
  help: any;
  helpuser: any;
  timediffS: any;
  timediffE: any;

  donationNumber: any = 0;
  error_ms: any;

  constructor(public alertCtrl: AlertController, private toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    

    storage.ready().then(() => {
      this.storage.get('helpuser').then((helpuser)=>{
        this.helpuser = helpuser;
      });
    });
  
    if (this.user == null){
      this.helpuser = this.navParams.get('helpuser');
      this.auth = false;
    }else{
      this.auth = true;
      this.num_donations = this.user.num_donations;
    }

    this.timediffS = moment(this.helpuser.startdate).diff(moment.now(), 'hours');
    this.timediffE = moment(this.helpuser.enddate).diff(moment.now(), 'hours');

    this.donationCount();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskhelphomePage');
  }

  async donationCount(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    await this.http.get('http://localhost:3000/api/helpdonations?helpid=' + this.helpuser._id)
    .subscribe((data: any) =>{
      loading.dismiss();
      console.log(900);
      this.donationNumber = data.count;
      console.log(this.donationNumber);
    }, (error: any) =>{
      loading.dismiss();
      console.log(error);
      this.error_ms = 'error retrieving data'
      this.presentToast(this.error_ms);
    }, ()=>{
      loading.dismiss();
     
      if (this.donationNumber == 0){
        this.error_ms = 'no data retrieved'
        this.presentToast(this.error_ms);
      }
    })
    
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
      
    });   
  
    toast.present();
  }

}
