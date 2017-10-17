import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {Login} from '../pages/login/login';
import {Signup} from '../pages/signup/signup';
import {ResetPassword} from '../pages/reset-password/reset-password';
import {QuizInfoModal} from '../pages/quiz-info-modal/quiz-info-modal';
import {PointsEarnedModal} from '../pages/points-earned-modal/points-earned-modal';
import {Quiz} from '../pages/quiz/quiz';
import {Review} from '../pages/review/review';
import {Results} from '../pages/results/results';
import {AuthData} from '../providers/auth-data';
import {UserData} from '../providers/user-data';
import {Time} from '../providers/time';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Settings} from '../pages/settings/settings';
import {YourIkms} from '../pages/your-ikms/your-ikms';
import {IkmDescription} from '../pages/ikm-description/ikm-description';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Signup,
    ResetPassword,
    QuizInfoModal,
    Quiz,
    Results,
    PointsEarnedModal,
    Review,
    Settings,
    YourIkms,
    IkmDescription
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Signup,
    ResetPassword,
    QuizInfoModal,
    Quiz,
    Results,
    PointsEarnedModal,
    Review,
    Settings,
    YourIkms,
    IkmDescription
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Time,
    AuthData,
    UserData
  ]
})
export class AppModule {}
