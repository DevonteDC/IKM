import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the PointsEarnedModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-points-earned-modal',
  templateUrl: 'points-earned-modal.html',
})
export class PointsEarnedModal {
  pointsEarned;
  reason;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.pointsEarned = this.navParams.get("pointsEarned");
    if(this.pointsEarned == 0){
      this.reason = "as there were either no new questions, or none answered correctly";
    }else if(this.pointsEarned == 1){
      this.reason = "for answering 1 new question correctly!";
    }else{
      this.reason = "for answering " + this.pointsEarned + " new questions correctly!";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointsEarnedModal');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
