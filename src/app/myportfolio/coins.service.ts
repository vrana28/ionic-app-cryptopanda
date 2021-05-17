import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, switchMap, take, tap} from "rxjs/operators";
import {Cryptocurrency} from "../cryptocurrency.model";
import {BehaviorSubject} from "rxjs";

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

  private _coins = new BehaviorSubject<Cryptocurrency[]>([]);

  constructor(private http: HttpClient) { }

  get coins(){
    return this._coins.asObservable();
  }

  // @ts-ignore
  addCoins(cryptocurrency:string,price:number,quantity:number, boughtDate: Date){
    let generatedId;

    return this.http.post<{name: string}>('https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/coins.json',
      {cryptocurrency,
            price,
            quantity,
            boughtDate}).pipe(switchMap((resData)=>{

              generatedId = resData.name;
              return  this.coins;


    }), take(1),
      tap((coins)=>{
      this._coins.next(coins.concat({
        id: generatedId,
        name,
        price,
        quantity,
        boughtDate,
        log_url:null,
        rank:null
      }));
    }));
  }

  getCoins(){
    return this.http.
    get<{[key:string]:CoinData}>('https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/coins.json').
    pipe(map((coinsData)=>{
      const coins: Cryptocurrency[] = [];
      for(const key in coinsData){
        if(coinsData.hasOwnProperty(key)){
          coins.push({
            id: key,
            name: coinsData[key].cryptocurrency,
            price: coinsData[key].price,
            quantity: coinsData[key].quantity,
            boughtDate: coinsData[key].boughtDate,
            log_url: null,
            rank: null
          });
        }
      }
      return coins;
      }),
      tap(coins=>{
        this._coins.next(coins);
      })
    );
  }

}
