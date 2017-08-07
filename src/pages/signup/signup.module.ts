import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import {SignupPage} from "./signup";


@NgModule({
  declarations: [SignupPage],
  imports: [
    IonicPageModule.forChild(SignupPage)
  ],
  exports: [SignupPage]
})

export class SignupPageModule {}
