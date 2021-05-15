import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'myportfolio',
    loadChildren: () => import('./myportfolio/myportfolio.module').then( m => m.MyportfolioPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'market',
    loadChildren: () => import('./market/market.module').then( m => m.MarketPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
