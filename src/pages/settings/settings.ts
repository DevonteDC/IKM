import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {UserData} from '../../providers/user-data';
/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {
  preferredCategories;
  preference;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public userData:UserData) {
    this.preference = this.navParams.get("preference");
    this.preferredCategories = this.navParams.get("preferredCategories");




  }

  selectedPublic(){
    this.userData.user.update({preference:"Public"});
  }

  selectedPrivate(){
    this.userData.user.update({preference:"Private"});
  }

  toggleBartender(){
    this.preferredCategories.Bartender = this.preferredCategories.Bartender == "On" ? "Off" : "On";
    this.userData.preferredCategories.update({Bartender:this.preferredCategories.Bartender});
  }

  toggleServer(){
    this.preferredCategories.Server = this.preferredCategories.Server == "On" ? "Off" : "On";
    this.userData.preferredCategories.update({Server:this.preferredCategories.Server});
  }

  toggleWine(){
    this.preferredCategories.Wine = this.preferredCategories.Wine == "On" ? "Off" : "On";
    this.userData.preferredCategories.update({Wine:this.preferredCategories.Wine});
  }

  toggleBeer(){
    this.preferredCategories.Beer = this.preferredCategories.Beer == "On" ? "Off" : "On";
    this.userData.preferredCategories.update({Beer:this.preferredCategories.Beer});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }



  goHome(){
    this.viewCtrl.dismiss({preference:this.preference,preferredCategories:this.preferredCategories});
  }


}
