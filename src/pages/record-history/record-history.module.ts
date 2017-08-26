import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordHistoryPage } from './record-history';

@NgModule({
  declarations: [
    RecordHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordHistoryPage),
  ],
})
export class RecordHistoryPageModule {}
