import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Storage} from "@ionic/storage";

import { SignupPage } from '../signup/signup';
import { UserPage } from '../user/user';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  user: any;
  auth: boolean = false;

  email: any;
  password: any;
  status: any;
  error_msg: any;
  num_donations: any = 0;
  

  constructor(private storage: Storage, public loadingCtrl: LoadingController, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
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
      this.navCtrl.pop();
    }

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  async signIn(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    await this.http.post('http://localhost:3000/api/signin',
    { 
      email : this.email,
      password: this.password,
      token: '111111'
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(data => {
      console.log(data)
      this.status = data['status'];
      this.user = data['user'];
      
      if(this.status['status'] == "1" ){
        this.storage.set('user', this.user);       
      }else if (this.status['status'] == "0"){
          this.error_msg = 'Unauthorized Access';
      }else if (this.status['status'] == "2"){
        this.error_msg = 'error';
      }else if (this.status['status'] == "3"){
        this.error_msg = 'Unknown error';
      }
    },
    error => {
      loading.dismiss(); 
      this.error_msg = 'more error'
      console.log(error);
    }, () => {
      loading.dismiss(); 
      console.log(44444);
              
        this.navCtrl.push(UserPage, {user: this.user});
      if(this.status['status'] == "1" ){

        
      }else if (this.status['status'] == "0"){
        this.error_msg = 'Unauthorized Access';
    }else if (this.status['status'] == "2"){
      this.error_msg = 'error';
    }else if (this.status['status'] == "3"){
      this.error_msg = 'Unknown error';
    }
     
    })


  
   

  }

  signUp(){
    this.navCtrl.push(SignupPage);
  }

}
