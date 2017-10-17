import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from '../pages/login/login';
import {HomePage} from '../pages/home/home';
import firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    firebase.initializeApp({
  apiKey: "AIzaSyDZqAXinX-LdRfDLl9u0DkDFdWd8ms33Hc",
 authDomain: "ikm-database.firebaseapp.com",
 databaseURL: "https://ikm-database.firebaseio.com",
 projectId: "ikm-database",
 storageBucket: "ikm-database.appspot.com",
 messagingSenderId: "1048241636973"
})
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
