import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketPage } from './market.page';

const routes: Routes = [
  {
    path: '',
    component: MarketPage
  },
  {
    path: 'explore',
    loadChildren: () => import('./explore/explore.module').then( m => m.ExplorePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketPageRoutingModule {}
