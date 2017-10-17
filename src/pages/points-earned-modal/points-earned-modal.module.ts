import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointsEarnedModal } from './points-earned-modal';

@NgModule({
  declarations: [
    PointsEarnedModal,
  ],
  imports: [
    IonicPageModule.forChild(PointsEarnedModal),
  ],
  exports: [
    PointsEarnedModal
  ]
})
export class PointsEarnedModalModule {}
