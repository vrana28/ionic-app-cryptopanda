/*import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  openMenu(){
    this.menuCtrl.open();
  }

  ngOnInit() {
  }

}*/
import {MenuController} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Cryptocurrency} from '../cryptocurrency.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  public cryptos$: Cryptocurrency[] | any;

  constructor(private dataService: DataService, private menuCtrl: MenuController) {
  }

  openMenu(){
    this.menuCtrl.open();
  }

 /* doRefresh(event) {
    console.log(HomePage);

    setTimeout(() => {
      console.log(HomePage);
      event.target.complete();
    }, 2000);
  }*/



  // tslint:disable-next-line:typedef
  ngOnInit() {
    return this.dataService.getPrices().subscribe( (data: any) => this.cryptos$ = data);
  }

}
