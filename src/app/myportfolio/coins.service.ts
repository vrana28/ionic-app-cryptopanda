import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface CoinData{
  cryptocurrency: string,
  price: number,
  quantity: number,
  boughtDate: Date,
}

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

  constructor(private http: HttpClient) { }

  // @ts-ignore
  addCoins(cryptocurrency:string,price:number,quantity:number, boughtDate: Date){
    return this.http.post<{name: string}>('https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/coins.json',
      {cryptocurrency,
            price,
            quantity,
            boughtDate});
  }

  getCoins(){
    return this.http.get<{[key:string]:CoinData}>('https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/coins.json');
  }

}
