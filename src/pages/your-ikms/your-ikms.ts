import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {IkmDescription} from '../ikm-description/ikm-description';
/**
 * Generated class for the YourIkms page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-your-ikms',
  templateUrl: 'your-ikms.html',
})
export class YourIkms {
  userCategories;
  userSubCategories;
  topCategory;
  ikms;
  constructor(public navCtrl: NavController, public navParams: NavParams,public zone:NgZone) {
    this.userCategories = navParams.get("userCategories");
    this.userSubCategories = navParams.get("userSubCategories");
    this.topCategory = navParams.get("topCategory");
    this.ikms =[];
    let me = this;

    zone.run(function(){
      if(me.userCategories.indexOf('Food') != - 1){
        me.userSubCategories.forEach(function(subCategory){
          firebase.database().ref("ikms/" + me.topCategory + "/Food/" + subCategory).on("child_added",function(snapshot){
              if(snapshot.val() != null){
                 me.ikms.push(snapshot.val());

              }
          })
        })

      }

      if(me.userCategories.indexOf('Beverages') != - 1){
        me.userSubCategories.forEach(function(subCategory){
          firebase.database().ref("ikms/" + me.topCategory + "/Beverages/" + subCategory).on("child_added",function(snapshot){
              if(snapshot.val() != null){
                 me.ikms.push(snapshot.val());
              }
          })
        })

      }

    })

  }


  openIkmDescription(index){
    this.navCtrl.push(IkmDescription,{ikm:this.ikms[index],topCategory:this.topCategory})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YourIkms');
  }

}
