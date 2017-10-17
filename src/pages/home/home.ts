import { Component,trigger,state,style,transition,animate,keyframes,NgZone } from '@angular/core';
import { NavController,ModalController,AlertController } from 'ionic-angular';

import {UserData} from '../../providers/user-data';
import {QuizInfoModal} from '../quiz-info-modal/quiz-info-modal';
import {Quiz} from '../quiz/quiz';
import {Review} from '../review/review';
import firebase from 'firebase';
import {Settings} from '../settings/settings';
import {YourIkms} from '../your-ikms/your-ikms';
import{IkmDescription} from '../ikm-description/ikm-description';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
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
export class HomePage {

  clearTemplate;
  ikms;
  userCategories;
  userSubCategories;
  employmentUnlocked;
  rewardsUnlocked;
  preference = "";
  preferredCategories;
  purpose = "";
  employmentIKMs;
  rewardsIKMs;
  allIKMs;
  deletedIKMs;
  visibleIKMs;
  deleting = false;
  constructor(public navCtrl: NavController,public modalCtrl:ModalController,public userData:UserData,public alertCtrl:AlertController,public zone:NgZone) {
    let me = this;
    this.employmentIKMs = [];
    this.rewardsIKMs = [];
    this.allIKMs = [];
    this.visibleIKMs = [];
    this.deletedIKMs = [];
    this.preferredCategories = {};


    this.userData.purpose.on("value",function(snapshot){
      me.zone.run(function(){
        if(snapshot.val() != null){
          me.purpose = snapshot.val();
          me.checkPurpose();
        }
      })
    })

    this.userData.deletedIKMs.on("child_added",function(snapshot){
      me.zone.run(function(){
        if(snapshot.val() != null){
          me.deletedIKMs.push(snapshot.val().key)
        }
      })
    })

    this.userData.preference.on("value",function(snapshot){
      me.zone.run(function(){
        if(snapshot.val() != null){
          me.preference = snapshot.val();
        }
      })
    })

    this.userData.preferredCategories.on("value",function(snapshot){
      me.employmentIKMs = [];
      me.rewardsIKMs = [];
      me.allIKMs = [];
      me.zone.run(function(){
        if(snapshot.val() != null){

          me.preferredCategories.Bartender = snapshot.val().Bartender == "On" ? "On":"Off";
          me.preferredCategories.Server = snapshot.val().Server == "On" ? "On":"Off";
          me.preferredCategories.Wine = snapshot.val().Wine == "On" ? "On":"Off";
          me.preferredCategories.Beer = snapshot.val().Beer == "On" ? "On":"Off";
        }

        me.grabIKMs();
        me.checkPurpose();

      })
    })







  }

  openIKM(index){
    if(this.deleting == false){
      this.navCtrl.push(IkmDescription,{ikm:this.visibleIKMs[index]})

    }
  }

  checkPurpose(){
    if(this.purpose == "All"){
      this.selectedAll();
    }else if(this.purpose == "Employment"){
      this.selectedEmployment();
    }else if(this.purpose == "Rewards"){
      this.selectedRewards();
    }
  }

  grabIKMs(){
    let me = this;
    //GRABBING THE IKMS
    this.userData.ikms.on("child_added",function(snapshot){
      me.zone.run(function(){
        let tempIKM = snapshot.val();
        if(me.preferredCategories[tempIKM.category] == "On"){
          tempIKM.key = snapshot.key;
          if(me.deletedIKMs.indexOf(tempIKM.key) == -1){
            me.allIKMs.push(tempIKM);
            if(tempIKM.purpose == "Employment"){
              me.employmentIKMs.push(tempIKM);
            }
            else if(tempIKM.purpose == "Rewards"){
              me.rewardsIKMs.push(tempIKM);
            }
          }
        }


      })
    })
    //GRABBING THE IKMS
  }

  deleteAlert(index){
    this.deleting = true;
    let alert = this.alertCtrl.create({
       title: 'Confirm deletion',
       message: 'Do you want to delete this IKM?',
       buttons: [
         {
           text: 'Cancel',
           role: 'cancel',
           handler: () => {
             this.deleting = false;
           }
         },
         {
           text: 'Yes',
           handler: () => {
             this.delete(index);
             this.deleting = false;
           }
         }
       ]
     });
     alert.present();
  }

  delete(index){


    let tempKey = this.visibleIKMs[index].key
    this.userData.deletedIKMs.push({key:tempKey})
    this.visibleIKMs.splice(index,1);
    this.employmentIKMs = [];
    this.rewardsIKMs = [];
    let me = this;
    this.allIKMs.forEach(function(i){
      if(i.key == tempKey){
        me.allIKMs.splice(me.allIKMs.indexOf(i.key),1);
      }else if(i.purpose == "Employment"){
        me.employmentIKMs.push(i);
      }else if(i.purpose == "Rewards"){
        me.rewardsIKMs.push(i);
      }
    })

  }

  selectedAll(){
    this.userData.user.update({purpose:"All"});
    this.visibleIKMs = this.allIKMs;

  }

  selectedEmployment(){
    this.userData.user.update({purpose:"Employment"});
    this.visibleIKMs = this.employmentIKMs;
  }

  selectedRewards(){
    this.userData.user.update({purpose:"Rewards"});
    this.visibleIKMs = this.rewardsIKMs;
  }





  settings(){
    let modal = this.modalCtrl.create(Settings,{preference:this.preference,preferredCategories:this.preferredCategories});

    modal.onDidDismiss(data =>{
      if(data != null){
        this.preference = data.preference;
        this.preferredCategories = data.preferredCategories;
      }


    })

    modal.present();
  }


}
