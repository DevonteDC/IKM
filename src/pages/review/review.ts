import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {UserData} from '../../providers/user-data';
/**
 * Generated class for the Review page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class Review {
  selectedTopic:string;
  selectedCategory:string;
  answerPackage;
  categories;
  topics;
  constructor(public navCtrl: NavController, public navParams: NavParams,public zone:NgZone,public userData:UserData) {
    this.categories = this.navParams.get("userCategories");
    this.topics  = [];
    this.answerPackage = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Review');
  }

  categorySelected(){

    if(this.selectedCategory.toString() != "[object Object]"){
      let me = this;
      firebase.database().ref("users/" + this.userData.userName + "/correctlyAnswered/" + this.selectedCategory + "/").on("child_added",function(snapshot){
        me.zone.run(function(){
          me.topics.push(snapshot.key);
        })
      })
    }

  }

  topicSelected(){
    if(this.selectedTopic.toString() != "[object Object]"){
      let me = this;
      firebase.database().ref("users/" + this.userData.userName + "/correctlyAnswered/" + this.selectedCategory + "/" + this.selectedTopic + "/").on("child_added",function(snapshot){
        me.zone.run(function(){
          if(snapshot.key != "points"){
            me.answerPackage.push(snapshot.val());

          }
        })
      })
    }

  }

}
