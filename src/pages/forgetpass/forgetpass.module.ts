
import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ForgetpassPage} from "./forgetpass";

@NgModule({
  imports : [IonicPageModule.forChild(ForgetpassPage)],
  exports: [ForgetpassPage],
  declarations: [ForgetpassPage]
})

export class ForgetpassPageModule {}
