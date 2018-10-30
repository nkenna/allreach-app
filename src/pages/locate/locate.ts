import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Storage} from "@ionic/storage";

import { HomePage } from '../home/home';
import { ReachhomePage } from '../reachhome/reachhome';
import { SigninPage } from '../signin/signin';

/**
 * Generated class for the LocatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locate',
  templateUrl: 'locate.html',
})
export class LocatePage {
  searchQuery: string = '';
  homes: Array<any>;
  selectedhome: any;
  icons: string[];
  home: any;

  user: any;
  auth: boolean = false;

  num_donations: any = 0; 

  constructor(private storage: Storage, public loadingCtrl: LoadingController, public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
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
    console.log('ionViewDidLoad LocatePage');
    this.initializeHomes();
  }

  async initializeHomes() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    await this.http.get('http://localhost:3000/api/allhomes')
    .subscribe((data: any) => {
        this.homes = data.homes;
    },
    (error: any) => {
      console.dir(error)
    },()=>{
      loading.dismiss();
    });
    
  
      console.log(this.homes)
   
  }

  getHomes(ev: any) {
    // Reset items back to all of the items
    this.initializeHomes();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.homes = this.homes.filter((home) => {
        return (home.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  homeCLicked(home) {
    // That's right, we're pushing to ourselves!
    //this.navCtrl.push(ReachhomePage)
     this.navCtrl.push(ReachhomePage, {
      h: home
    }); 
  }

  signin(){
    this.navCtrl.push(SigninPage)
  } 

  

}
