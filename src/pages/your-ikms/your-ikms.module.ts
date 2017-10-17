import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YourIkms } from './your-ikms';

@NgModule({
  declarations: [
    YourIkms,
  ],
  imports: [
    IonicPageModule.forChild(YourIkms),
  ],
  exports: [
    YourIkms
  ]
})
export class YourIkmsModule {}
