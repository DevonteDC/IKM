import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizInfoModal } from './quiz-info-modal';

@NgModule({
  declarations: [
    QuizInfoModal,
  ],
  imports: [
    IonicPageModule.forChild(QuizInfoModal),
  ],
  exports: [
    QuizInfoModal
  ]
})
export class QuizInfoModalModule {}
