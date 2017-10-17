import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserData {
  public uid: any;
  public user: any;
  public app:any;
  public email;
  public appName;
  public employmentQuestions;
  public educationQuestions;
  public rewardsQuestions;
  public categoriesActivated;
  public userName = "Devonte";
  public preferredCategories;
  public preference;
  public purpose;
  public ikms;
  public deletedIKMs;
  constructor() {
    if(firebase.auth().currentUser){
        this.refreshUid();
    }

    this.appName = "IKM";
    this.employmentQuestions = firebase.database().ref("/questions/Employment/");
    this.educationQuestions = firebase.database().ref("/questions/Education/");
    this.rewardsQuestions = firebase.database().ref("/questions/Rewards/");
    this.categoriesActivated = firebase.database().ref("/users/" + this.userName + "/categoriesActivated/");
    this.preferredCategories = firebase.database().ref("/users/" + this.userName + "/preferredCategories");
    this.preference = firebase.database().ref("users/" + this.userName + "/preference");
    this.purpose = firebase.database().ref("users/" + this.userName + "/purpose");
    this.user = firebase.database().ref('/users/' + this.userName);
    this.ikms = firebase.database().ref("/ikms/");
    this.deletedIKMs = firebase.database().ref("users/" + this.userName + "/deleted");
  }


  refreshUid(){
    this.uid = firebase.auth().currentUser.uid;
    this.email = firebase.auth().currentUser.email;




  }

  insertIntoCorrect(category,topic,key,data){
    firebase.database().ref("users/" + this.userName + "/correctlyAnswered/" + category + "/" + topic + "/" + key + "/").update(data);

  }

  addPoints(category,topic,points){
    firebase.database().ref("users/" + this.userName + "/correctlyAnswered/" + category + "/" + topic + "/").update({points:points});
  }

  employmentOn(){
      this.categoriesActivated.update({Employment:"on"});
  }

  employmentOff(){
      this.categoriesActivated.update({Employment:"off"});
  }


  rewardsOn(){
      this.categoriesActivated.update({Rewards:"on"});
  }

  rewardsOff(){
      this.categoriesActivated.update({Rewards:"off"});
  }



    foodOn(){
        this.categoriesActivated.update({Food:"on"});
    }

    foodOff(){
        this.categoriesActivated.update({Food:"off"});
    }

    beveragesOn(){
        this.categoriesActivated.update({Beverages:"on"});
    }

    beveragesOff(){
        this.categoriesActivated.update({Beverages:"off"});
    }

    tacosOn(){
        this.categoriesActivated.update({Tacos:"on"});
    }

    tacosOff(){
        this.categoriesActivated.update({Tacos:"off"});
    }


    pizzaOn(){
        this.categoriesActivated.update({Pizza:"on"});
    }

    pizzaOff(){
        this.categoriesActivated.update({Pizza:"off"});
    }


    wineOn(){
        this.categoriesActivated.update({Wine:"on"});
    }

    wineOff(){
        this.categoriesActivated.update({Wine:"off"});
    }


    beerOn(){
        this.categoriesActivated.update({Beer:"on"});
    }

    beerOff(){
        this.categoriesActivated.update({Beer:"off"});
    }














}
