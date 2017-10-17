import { Component,NgZone,OnInit,OnDestroy,trigger,state,style,transition,animate,keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {Subscription} from 'rxjs';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {UserData} from '../../providers/user-data';
import firebase from 'firebase';
import {Results} from '../results/results';
import {HomePage} from '../home/home';
/**
 * Generated class for the Quiz page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
  animations:[

    trigger('flip',[
      state('flipped',style({
        transform:'rotateY(180deg)',
        backgroundColor:'#f50e80'
      })),
      transition('* => flipped',animate('400ms ease'))
    ]),

    trigger('flyInOut',[
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(150%, 0, 0)'
      })),
      transition('in => out', animate('200ms ease-in')),
      transition('out => in', animate('200ms ease-out'))
    ]),

    trigger('fade',[
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0.1
      })),
      transition('visible <=> invisible', animate('200ms linear'))
    ]),

    trigger('bounce', [
      state('bouncing', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing', [
        animate('300ms ease-in', keyframes([
          style({transform: 'translate3d(0,0,0)', offset: 0}),
          style({transform: 'translate3d(0,50%,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),

    trigger('size',[
      state('shrink', style({
        transform:'rotateY(180deg)',

      })),
      state('grow', style({
        transform:'rotateY(1deg)',
      })),

      transition('shrink => grow', animate('200ms ease-in')),
      transition('grow => shrink', animate('200ms ease-out'))
    ]),


  ]
})
export class Quiz {
  //
  //
  questionsForQuiz;
  currentQuestion
  qIndex;
  numberOfQuestions;
  ikm;
  initiate = false;
  topicData;
  questions;
  showQuestions;
  currentAnswers;
  answers;
  chosenAnswer;
  answerPackage;
  tick:number;
  subscription:Subscription;
  userAnsweredQuestions;
  userQuestionData;
  pointsEarned;
  timeToFlip;
  name;
  timerType;
  topCategory;
  accumulatedTime = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public zone:NgZone,
    public userData:UserData,public loadingCtrl:LoadingController,public alertCtrl:AlertController) {
    //
    let me = this;
    this.ikm = navParams.get("ikm");
    this.questions = this.ikm.questions;
    this.name = this.ikm.name;
    this.timerType = this.ikm.timerType;
    this.topCategory = navParams.get("topCategory");
    //

    this.pointsEarned = 0;
    this.answerPackage = [];
    this.userAnsweredQuestions = [];
    this.chosenAnswer = null;
    this.showQuestions = false;
    this.currentAnswers = {};
    this.answers = [];

    this.numberOfQuestions = Number(this.ikm.questionCount);
    //this.userQuestionData = firebase.database().ref("/users/" + this.userData.userName + "/correctlyAnswered/" + this.ikm.category + "/" + this.ikm.topic + "/");

    this.timeToFlip = "grow";






    this.questions = this.shuffle(this.questions);







    this.qIndex = 1;
    this.setupQuestion();
    this.presentLoading();


  }


  setupQuestion(){
    this.currentQuestion = this.questions[this.qIndex - 1];



    if(this.currentQuestion.questionType == "mc4"){
      this.answers = [this.currentQuestion.correctAnswer,this.currentQuestion.incorrectAnswer1,
        this.currentQuestion.incorrectAnswer2,this.currentQuestion.incorrectAnswer3];
      this.answers = this.shuffle(this.answers);
      this.currentAnswers = {
        first:this.answers[0],
        second:this.answers[1],
        third:this.answers[2],
        fourth:this.answers[3]
      }
    }

    else if(this.currentQuestion.questionType == "mc3"){
      this.answers = [this.currentQuestion.correctAnswer,this.currentQuestion.incorrectAnswer1,
        this.currentQuestion.incorrectAnswer2];
      this.answers = this.shuffle(this.answers);
      this.currentAnswers = {
        first:this.answers[0],
        second:this.answers[1],
        third:this.answers[2]
      }
    }
    else{
      this.answers = [this.currentQuestion.correctAnswer,this.currentQuestion.incorrectAnswer1];
      this.answers = this.shuffle(this.answers);
      this.currentAnswers = {
        first:this.answers[0],
        second:this.answers[1],
      }
    }



  }

  startIndividualTimer(){
    let timer = TimerObservable.create(500,1000);
      this.subscription = timer.subscribe(t => {
        this.tick = Number(this.currentQuestion.timer) - t;
        if(this.tick == 0){
          this.nextQuestion();
        }
      })
  }

  startTotalTimer(){
    let timer = TimerObservable.create(500,1000);
    this.subscription = timer.subscribe(t => {
      this.tick = Number(this.currentQuestion.timer) - t;
      if(this.tick == 0){
        this.qIndex = this.numberOfQuestions;
        this.nextQuestion();
      }
    })
  }



  endTimer(){
    this.subscription.unsubscribe();

  }

  shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 1) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Quiz');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Loading questions...",
      duration: 500
    });
    loader.present();
    this.timerType == "Individual" ? this.startIndividualTimer() : this.startTotalTimer();

    loader.onDidDismiss(() => {
      this.showQuestions = true;

    });
  }

  alternateFlips(){
    this.timeToFlip = this.timeToFlip == "shrink" ? 'grow':'shrink';
  }



  insertIntoAnswerPackage(){

    let answerContents =     {
          first:this.currentAnswers.first,
          second:this.currentAnswers.second,
          third:this.currentAnswers.third,
          fourth:this.currentAnswers.fourth,
          question:this.currentQuestion.question,
          correct: this.currentQuestion.correctAnswer == this.currentAnswers[this.chosenAnswer]? 'Correct!' : 'Incorrect!',
          selectedAnswer: this.chosenAnswer,
          time:10 - this.tick,
          [this.chosenAnswer + "Color"]:this.currentQuestion.correctAnswer == this.currentAnswers[this.chosenAnswer] ? 'green' : 'red'
        }
    this.answerPackage.push(answerContents);

      if( this.currentQuestion.correctAnswer == this.currentAnswers[this.chosenAnswer]){
        /*this.userData.insertIntoCorrect(this.ikm.category,this.ikm.topic,this.currentQuestion.key,answerContents);
        let me = this;
        firebase.database().ref("users/" + this.userData.userName + "/correctlyAnswered/" + this.ikm.category + "/" + this.ikm.topic + "/points").once("value",function(snapshot){
          me.zone.run(function(){
              me.userData.addPoints(me.ikm.category,me.ikm.topic,snapshot.val() + 1);
          })
        })*/


        this.pointsEarned += 1;
      }
  }
  exitQuiz(){
    let alert = this.alertCtrl.create({
       title: 'Confirm exit',
       message: 'Do you want to quit this quiz?',
       buttons: [
         {
           text: 'Cancel',
           role: 'cancel',
           handler: () => {

           }
         },
         {
           text: 'Yes',
           handler: () => {
             this.endTimer();
             this.navCtrl.setRoot(HomePage);
           }
         }
       ]
     });
     alert.present();
  }
  nextQuestion(){
    if(this.initiate){
      if(this.qIndex == this.numberOfQuestions){
        this.endTimer();
        this.insertIntoAnswerPackage();
        let loader = this.loadingCtrl.create({
          content: "Loading results...",
          duration: 500
        });
        loader.present();
        loader.onDidDismiss(() => {
          this.navCtrl.setRoot(Results,{answerPackage:this.answerPackage,pointsEarned:this.pointsEarned,ikm:this.ikm});
        });

      }else{
        this.alternateFlips();
        let me = this;
        window.setTimeout(function(){
          me.alternateFlips();
          // code to run after 5 seconds...
        }, 100);
        //Insert into answer package
        if(this.timerType == "Individual"){
          this.endTimer();
          this.insertIntoAnswerPackage();
          this.startIndividualTimer();
        }else if (this.timerType == "Total"){
            this.insertIntoAnswerPackage();
        }


        this.qIndex += 1;
        this.setupQuestion();
        this.chosenAnswer = null;

      }
    }
    this.initiate = true;
  }

}
