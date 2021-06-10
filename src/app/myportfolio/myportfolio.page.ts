import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {Cryptocurrency} from "../cryptocurrency.model";
import {DataService} from "../data.service";
import {LoadingController, MenuController, ModalController, NavController} from "@ionic/angular";
import {MyportfolioModalComponent} from "./myportfolio-modal/myportfolio-modal.component";
import {CoinsService} from "./coins.service";
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {LogInPage} from "../auth/log-in/log-in.page";

@Component({
  selector: 'app-myporfolio',
  templateUrl: './myportfolio.page.html',
  styleUrls: ['./myportfolio.page.scss']
})
export class MyportfolioPage implements  OnInit, OnDestroy{

  public static balance: number=0;
  public balance2 : number=0;
  public balance3 : number=0;
  public balance4: number = 0;
  public cryptos$: Cryptocurrency[] | any;
  private coinSub: Subscription;
  isLoading = false;

  constructor(private dataService: DataService, private menuCtrl: MenuController, private modalCtrl:ModalController, private coinService:CoinsService, private auth:AuthService,
              private loadingCtrl: LoadingController, private navCtrl:NavController) {
    console.log('constructor');
  }

  openMenu(){
    this.menuCtrl.open();
  }

  id: string;
  user: any;
  coins: Cryptocurrency[];
  coinsApi: Cryptocurrency[];

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

  onDeleteQuote(coin) {
    this.loadingCtrl.create({message: 'Deleting...'}).then(loadingEl => {
      loadingEl.present();
      this.coinService.deleteCoin(coin.id).subscribe(() => {
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/myportfolio');
      });
    });
  }

  ngOnInit() {
    this.coinSub = this.coinService.coins.subscribe((coins)=>{
      this.coins = coins;
    });
    this.auth.userId.subscribe(data=>this.id=data);
    console.log(this.coins);
    this.dataService.getPrices().subscribe( (data: any) => {
      this.cryptos$ = data
    });
  }

  ionViewWillEnter(){
    MyportfolioPage.balance=0;
    this.balance2=0;
    this.balance3=0;
    this.balance4=0;
    this.coinService.getCoins(LogInPage.idCurrent).subscribe((coins)=>{
      this.coins = coins;
      for(const coin in this.coins){
        MyportfolioPage.balance+=this.coins[coin].price*this.coins[coin].quantity;
      }
      this.balance2 = MyportfolioPage.balance;
    });
    for(const coin in this.coins){
      for(const coin2 in this.cryptos$){
        if(this.coins[coin].name==this.cryptos$[coin2].id){
          this.balance3+=this.coins[coin].quantity*this.cryptos$[coin2].price;
        }
      }
    }
  }

  ngOnDestroy() {
    if(this.coinSub){
      this.coinSub.unsubscribe();
    }
  }

}
