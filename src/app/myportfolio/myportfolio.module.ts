import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyportfolioPageRoutingModule } from './myportfolio-routing.module';

import { MyportfolioPage } from './myportfolio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyportfolioPageRoutingModule
  ],
  declarations: [MyportfolioPage]
})
export class MyportfolioPageModule {}
