import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, switchMap, take, tap} from "rxjs/operators";
import {Cryptocurrency} from "../cryptocurrency.model";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {Offer, TypeOfOffer} from "./offer.model";

interface OfferData{
  coinName: string,
  type: TypeOfOffer,
  quantity: number,
    userId: string
}

@Injectable({
  providedIn: 'root'
})

export class OfferService {

  private _offers = new BehaviorSubject<Offer[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get offers(){
    return this._offers.asObservable();
  }

  // @ts-ignore
  addOffers(cryptocurrency:string,quantity:number, type: TypeOfOffer){
    let generatedId;
    let newOffer : Offer;

    return this.authService.userId.pipe(
      take(1),
      switchMap(userId=>{
        newOffer = new Offer(null,
          type,cryptocurrency,quantity,userId);
        return this.http.post<{name: string}>('https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/offers.json',
          newOffer);
      }),
      take(1),
      switchMap((resData)=>{

        generatedId = resData.name;
        return  this.offers;
      }),
      take(1),
      tap((offers)=>{
        newOffer.id = generatedId;
        this._offers.next(offers.concat(newOffer));
      })
    );
  }

  getOffers(){
    return this.http.
    get<{[key:string]:OfferData}>('https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/offers.json').
    pipe(map((offerData)=>{
        const offers: Offer[] = [];
        for(const key in offerData){
          if(offerData.hasOwnProperty(key)){
            offers.push(new Offer(key,offerData[key].type,offerData[key].coinName,offerData[key].quantity, offerData[key].userId));
          }
        }
        return offers;
      }),
      tap(offers=>{
        this._offers.next(offers);
      })
    );
  }

}

