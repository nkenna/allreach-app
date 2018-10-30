import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController,  AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Storage} from "@ionic/storage";
import { AskhelphomePage } from '../askhelphome/askhelphome';

/**
 * Generated class for the CalloutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-callout',
  templateUrl: 'callout.html',
})
export class CalloutPage {
  user: any;
  auth: boolean = false;

  name: any
  note: any
  title: any
  address: any
  phone: any
  location: any
  state: any
  country: any
  startdate: any
  enddate: any 
  email: any;
  password: any;
  info: any
  status: any;
  error_msg: any;

  num_donations: any = 0;
  help: any;
  helpuser: any;

  constructor(public alertCtrl: AlertController, private toastCtrl: ToastController, private storage: Storage, public loadingCtrl: LoadingController, public http: HttpClient,  public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalloutPage');
  }

  submit(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

   this.http.post('http://localhost:3000/api/addhelp',
    { 
      name: this.name,
      note: this.note,
      title: this.title,
      email : this.email,
      password: this.password,
      address: this.address,
      phone: this.phone,
      location: this.location,
      state: this.state,
      country: this.country,
      info: this.info,
      startdate: this.startdate,
      enddate: this.enddate
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(data => {
     console.log(data['status']);
     this.status = data['status'];
     this.help = data['help'];
    },
    error => {
      loading.dismiss(); 
      console.log(error);
      this.presentToast('error in operation')
    }, () => {
      loading.dismiss(); 
      if(this.status == 1){
        loading.dismiss(); 
        //this.storage.set('user', this.status['user']); 
         this.navCtrl.push(AskhelphomePage, {user: this.status['user']});
      }
     
    })
  }

  signIn(){
    this.showPrompt();
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter email and password ",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
                  },
        {
          name: 'password',
          placeholder: 'Password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            console.log(454)
            console.log(data);
           var email = data['email'];
           var password = data['password'];
            this.signinhelp(email, password);

          }
        }
      ]
    });
    prompt.present();
  }

  async signinhelp(email, password){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    await this.http.post('http://localhost:3000/api/signinhelp',
    { 
      email : email,
      password: password,
      token: '222222'
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(data => {
      console.log(data)
      this.status = data['status'];
      this.helpuser = data['helpuser'];
      
      if(this.status['status'] == "1" ){
        this.storage.set('helpuser', this.helpuser);       
      }else if (this.status['status'] == "0"){
          this.error_msg = 'Unauthorized Access';
      }else if (this.status['status'] == "2"){
        this.error_msg = 'invalid token';
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
      this.storage.set('helpuser', this.helpuser);    
        this.navCtrl.push(AskhelphomePage, {helpuser: this.helpuser});
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



  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
      
    });
  
    
  
    toast.present();
  }

}
