import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { NgModule } from '@angular/core';


@NgModule({
    exports: [
        HomePage
    ],
    imports : [
        IonicPageModule.forChild(HomePage)
    ],
    declarations: [
        HomePage
    ]
})

export class HomePageModule {}