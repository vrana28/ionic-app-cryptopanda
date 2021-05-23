import { Component, OnInit } from '@angular/core';
import {MyportfolioModalComponent} from "../myportfolio/myportfolio-modal/myportfolio-modal.component";
import {MenuController, ModalController} from "@ionic/angular";
import {MarketModalComponent} from "./market-modal/market-modal.component";
import {OfferService} from "./offer.service";
import {Cryptocurrency} from "../cryptocurrency.model";
import {Subscription} from "rxjs";
import {DataService} from "../data.service";
import {CoinsService} from "../myportfolio/coins.service";
import {Offer, TypeOfOffer} from "./offer.model";

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {

  public balance: number;
  public cryptos$: Cryptocurrency[] | any;
  private offerSub: Subscription;
  public typeOfOffer: TypeOfOffer;

  constructor(private dataService: DataService, private menuCtrl: MenuController, private modalCtrl:ModalController, private offerService:OfferService) {
    console.log('constructor');
  }

  openMenu(){
    this.menuCtrl.open();
  }

  offers: Offer[];

  openModal(){
    this.modalCtrl.create({
      component: MarketModalComponent,
      componentProps: {title:'Add your offer'}
    }).then((modal)=>{
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData)=>{
      if(resultData.role ==='confirm'){
        console.log(resultData);
        this.offerService.addOffers(resultData.data.offerData.cryptocurrency,
          resultData.data.offerData.quantity,resultData.data.offerData.type, resultData.data.offerData.location).subscribe((offers)=>{
          /*this.coins = coins;*/
        });
      }
    });
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.offerSub = this.offerService.offers.subscribe((offers)=>{
      this.offers = offers;
    });
    return this.dataService.getPrices().subscribe( (data: any) => this.cryptos$ = data);
  }

  ionViewWillEnter(){
    this.offerService.getOffers().subscribe((offers)=>{
      /*this.coins = coins;*/
    });
  }

  ngOnDestroy() {
    if(this.offerSub){
      this.offerSub.unsubscribe();
    }
  }

}
