import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Storage} from "@ionic/storage";

import { SigninPage } from '../signin/signin';
import { UserPage } from '../user/user';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  user: any;
  auth: boolean = false;

  firstname: any
  middlename: any
  lastname: any
  address: any
  phone: any
  location: any
  state: any
  country: any
  nature: any 
  email: any;
  password: any;
  status: any;
  error_msg: any;

  num_donations: any = 0;



  constructor(private toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
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

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

   this.http.post('http://localhost:3000/api/signup',
    { 
      firstname: this.firstname,
      middlename: this.middlename,
      lastname: this.lastname,
      email : this.email,
      password: this.password,
      address: this.address,
      phone: this.phone,
      location: this.location,
      state: this.state,
      country: this.country,
      nature: this.nature
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(data => {
     console.log(data['status']);
     this.status = data['status'];
    },
    error => {
      loading.dismiss(); 
      console.log(error);
      this.presentToast('error in operation')
    }, () => {
      if(this.status == 1){
        loading.dismiss(); 
        this.storage.set('user', this.status['user']); 
         this.navCtrl.push(UserPage, {user: this.status['user']});
      }
     
    })
  }

  signIn(){
    this.navCtrl.push(SigninPage);
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
      
    });   
  
    toast.present();
  }

}
