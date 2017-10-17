import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the QuizInfoModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-quiz-info-modal',
  templateUrl: 'quiz-info-modal.html',
})
export class QuizInfoModal {
  ikm;
  numberOfQuestions;
  questionsCountForQuiz;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
      this.ikm = navParams.get("ikm");
      this.numberOfQuestions = Number(this.ikm.numberOfQuestions);
      if(this.numberOfQuestions > 5){
        this.questionsCountForQuiz = 5;
      }else{
        this.questionsCountForQuiz = this.numberOfQuestions;
      }
  }

  startQuestions(){
    this.viewCtrl.dismiss({ikm:this.ikm})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizInfoModal');
  }

}
