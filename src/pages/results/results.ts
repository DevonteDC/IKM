import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {PointsEarnedModal} from '../points-earned-modal/points-earned-modal';
import {HomePage} from '../home/home';

/**
 * Generated class for the Results page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class Results {
  answerPackage;
  pointsEarned;
  ikm;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController) {
    this.answerPackage = this.navParams.get("answerPackage");
    this.pointsEarned = this.navParams.get("pointsEarned");
    this.ikm = this.navParams.get("ikm");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Results');
  }

  openPointsModal(){
    this.navCtrl.setRoot(HomePage);
      /*let modal = this.modalCtrl.create(PointsEarnedModal,{pointsEarned:this.pointsEarned});

      modal.onDidDismiss(data =>{
          this.navCtrl.setRoot(HomePage);
      })

      modal.present(); */
    }

}
