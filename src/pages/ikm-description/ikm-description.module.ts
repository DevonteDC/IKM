import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IkmDescription } from './ikm-description';

@NgModule({
  declarations: [
    IkmDescription,
  ],
  imports: [
    IonicPageModule.forChild(IkmDescription),
  ],
  exports: [
    IkmDescription
  ]
})
export class IkmDescriptionModule {}
