/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myportfolio',
  templateUrl: './myportfolio.page.html',
  styleUrls: ['./myportfolio.page.scss'],
})
export class MyportfolioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/

import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {Cryptocurrency} from "../cryptocurrency.model";
import {DataService} from "../data.service";
import {MenuController, ModalController} from "@ionic/angular";
import {MyportfolioModalComponent} from "./myportfolio-modal/myportfolio-modal.component";
import {CoinsService} from "./coins.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-myporfolio',
  templateUrl: './myportfolio.page.html',
  styleUrls: ['./myportfolio.page.scss']
})
export class MyportfolioPage implements  OnInit, OnDestroy{
  /*text = 'quote';
  author = 'author';
  fullQuote = 'full quote';*/
  public balance: number;
  public cryptos$: Cryptocurrency[] | any;
  private coinSub: Subscription;

  constructor(private dataService: DataService, private menuCtrl: MenuController, private modalCtrl:ModalController, private coinService:CoinsService) {
    console.log('constructor');
  }

  openMenu(){
    this.menuCtrl.open();
  }



  coins: Cryptocurrency[];

  openModal(){
    this.modalCtrl.create({
      component: MyportfolioModalComponent,
      componentProps: {title:'Add coin'}
    }).then((modal)=>{
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData)=>{
      if(resultData.role ==='confirm'){
        console.log(resultData);
        this.coinService.addCoins(resultData.data.coinData.cryptocurrency, resultData.data.coinData.price,
          resultData.data.coinData.quantity, resultData.data.coinData.date).subscribe((coins)=>{
            /*this.coins = coins;*/
        });
      }
    });
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.coinSub = this.coinService.coins.subscribe((coins)=>{
      this.coins = coins;
    });
  }

  ionViewWillEnter(){
    this.coinService.getCoins().subscribe((coins)=>{
      /*this.coins = coins;*/
    });
  }

  ngOnDestroy() {
    if(this.coinSub){
      this.coinSub.unsubscribe();
    }
  }

}
