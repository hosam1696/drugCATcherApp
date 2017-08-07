import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyoffersPage } from './dailyoffers';

@NgModule({
  declarations: [
    DailyoffersPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyoffersPage),
  ],
})
export class DailyoffersPageModule {}
