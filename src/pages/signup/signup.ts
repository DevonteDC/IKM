import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthData} from '../../providers/auth-data';
import {HomePage} from '../home/home';
/*
/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  public signupForm;
  emailChanged:boolean = false;
  passwordChanged:boolean = false;
  submitAttempt:boolean = false;
  loading: any;

  constructor(public navCtrl: NavController,public authData: AuthData, public formBuilder: FormBuilder,
      public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
        this.signupForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      })
      }

  ionViewDidLoad() {
    console.log('Hello SignupPage Page');
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
}

signupUser(){
  this.submitAttempt = true;
  this.loading = this.loadingCtrl.create({
  });
  this.loading.present();

  if (!this.signupForm.valid){
    console.log(this.signupForm.value);
  } else {
    this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(() => {
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);

    }, (error) => {
      this.loading.dismiss();
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




  }
}
}
