import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, switchMap, take, tap} from "rxjs/operators";
import {Cryptocurrency} from "../cryptocurrency.model";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../auth/auth.service";

interface CoinData{
  name: string,
  price: number,
  quantity: number,
  boughtDate: Date,
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class CoinsService {

  private _coins = new BehaviorSubject<Cryptocurrency[]>([]);


  constructor(private http: HttpClient, private authService: AuthService) { }


  get coins(){
    return this._coins.asObservable();
  }

  // @ts-ignore
  addCoins(cryptocurrency:string,price:number,quantity:number, boughtDate: Date){
    let generatedId;
    let newCoin : Cryptocurrency;
    let fetchedUserId: string;

    return this.authService.userId.pipe(
      take(1),
      switchMap(userId=>{
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token)=>{
        newCoin = new Cryptocurrency(null,
          cryptocurrency,price,null,boughtDate,null,quantity,fetchedUserId);
        return this.http.post<{name: string}>(`https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/coins.json?auth=${token}`,
          newCoin);
      }),
      take(1),
      switchMap((resData)=>{

        generatedId = resData.name;
        return  this.coins;
      }),
      take(1),
      tap((coins)=>{
        newCoin.id = generatedId;
        this._coins.next(coins.concat(newCoin));
      })
      );
  }

  deleteCoin(id: string) {
    console.log(id);
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/coins/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.coins;
      }),
      take(1),
      tap((coins) => {
        this._coins.next(coins.filter((q) => q.id !== id));
      })
    );
  }

  getCoins(id) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: CoinData }>(
          `https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/coins.json?auth=${token}`
        );
      }),
      map((coinsData) => {
        const coins: Cryptocurrency[] = [];
        for (const key in coinsData) {
          if (coinsData.hasOwnProperty(key) && coinsData[key].userId==id) {
            coins.push(new Cryptocurrency(key, coinsData[key].name, coinsData[key].price, null, coinsData[key].boughtDate,
              null, coinsData[key].quantity, coinsData[key].userId));
          }
        }
        return coins;
      }),
      tap(coins => {
        this._coins.next(coins);
      })
    );
  }

  editCoin(
    id: string,
    name: string,
    price: number,
    quantity: number,
    boughtDate: Date,
    userId: string
  ) {
    console.log(quantity);
    console.log(price);
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.put(
          `https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/coins/${id}.json?auth=${token}`,
          {
            boughtDate,
            name,
            price,
            quantity,
            userId
          }
        );
      }),
      switchMap(() => {
        return this.coins;
      }),
      take(1),
      tap((coins) => {
        const updatedCoinIndex = coins.findIndex((q) => q.id === id);
        const updatedCoins = [...coins];
        updatedCoins[updatedCoinIndex] = new Cryptocurrency(
          id,
          name,
          price,
          null,
          boughtDate,
          0,
          quantity,
          userId
        );
        this._coins.next(updatedCoins);
      })
    );
  }

}
