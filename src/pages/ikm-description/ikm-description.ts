import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Quiz} from '../quiz/quiz';
/**
 * Generated class for the IkmDescription page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ikm-description',
  templateUrl: 'ikm-description.html',
})
export class IkmDescription {
  postTime;
  location;
  description;
  name;
  topCategory;
  questionCount;
  totalTime = 0;
  timerType;
  ikm;
  questions;
  purpose;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let me = this;
    this.ikm = navParams.get("ikm");
    this.questions = this.ikm.questions;
    this.questionCount = this.ikm.questionCount;
    this.description = this.ikm.description;
    this.location = "type of place at specific location for " + this.ikm.creator;
    //this.location = this.ikm.location;
    this.postTime = this.ikm.postTime;
    this.name = this.ikm.name;
    this.timerType = this.ikm.timerType;
    this.purpose = this.ikm.purpose;
    if(this.timerType == "Total"){
      this.totalTime = Number(this.questions[0].timer);
    }else{

      this.questions.forEach(function(q){
        console.log(q.timer);
        me.totalTime += Number(q.timer);
      })
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

  takeIKM(){
    this.navCtrl.setRoot(Quiz,{ikm:this.ikm})
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad IkmDescription');
  }

}
