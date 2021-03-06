import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketPageRoutingModule } from './market-routing.module';

import { MarketPage } from './market.page';
import {MarketModalComponent} from "./market-modal/market-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketPageRoutingModule
  ],
  declarations: [MarketPage, MarketModalComponent],
  entryComponents: [MarketModalComponent]
})
export class MarketPageModule {}
