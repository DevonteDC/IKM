import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {Time} from '../providers/time';

/*
  Generated class for the AuthData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthData {

  public fireAuth: any;
  public users: any;
  constructor(public time: Time) {
    this.fireAuth = firebase.auth();
    this.users = firebase.database().ref('/users');
  }

  loginUser(email: string, password: string):any{
      return this.fireAuth.signInWithEmailAndPassword(email,password);
  }

  signupUser(email: string, password: string): any{
    let me = this;
    return this.fireAuth.createUserWithEmailAndPassword(email,password)
        .then((newUser) => {
            this.users.child(newUser.uid).set({email:email,loginType:"email",
                                              since:me.time.createTimestamp()})
        });
  }

  logoutUser(): any{
      return this.fireAuth.signOut();
  }

  resetPassword(email: string): any{
    return this.fireAuth.sendPasswordResetEmail(email);
  }

}
