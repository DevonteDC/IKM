import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,MenuController } from 'ionic-angular';
import {FormBuilder,Validators} from '@angular/forms';

import {AuthData} from '../../providers/auth-data';
import {Signup} from '../signup/signup';
import {HomePage} from '../home/home';
import {ResetPassword} from '../reset-password/reset-password';

import {Time} from '../../providers/time';
import {UserData} from '../../providers/user-data';
import firebase from 'firebase';
/*
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController, public authData:AuthData,public formBuilder:FormBuilder,public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,public menuCtrl:MenuController,public zone:NgZone,public time:Time,public userData:UserData ) {
      this.loginForm = formBuilder.group({
        email:['',Validators.compose([Validators.required])],
        password:['',Validators.compose([Validators.minLength(6),Validators.required])]
      });

      if(firebase.auth().currentUser){
        this.navCtrl.setRoot(HomePage);
      }
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }


  ionViewDidLoad() {
    this.menuCtrl.swipeEnable(false, 'menu');
  }

  loginUser(){
    this.submitAttempt = true;
    let me = this;

    this.loading = this.loadingCtrl.create({
    });
    this.loading.present();

    if(!this.loginForm.valid){
      console.log(this.loginForm.value);
    }else{


      this.authData.loginUser(this.loginForm.value.email,this.loginForm.value.password).then(authData => {
        this.userData.refreshUid();



        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      },error =>{
        this.loading.dismiss().then(()=>{
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });



    }
  }

  goToSignup(){
    this.navCtrl.push(Signup);
  }

  goToResetPassword(){
    this.navCtrl.push(ResetPassword);
  }
}
