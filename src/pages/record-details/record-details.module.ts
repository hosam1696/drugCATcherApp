import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordDetailsPage } from './record-details';

@NgModule({
  declarations: [
    RecordDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordDetailsPage),
  ],
})
export class RecordDetailsPageModule {}
