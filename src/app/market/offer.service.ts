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
    userId: string,
  location: string,
  userName: string,
  contact: number
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
  addOffers(cryptocurrency:string,quantity:number, type: TypeOfOffer, location:string, userName:string, contact:number){
    let generatedId;
    let newOffer : Offer;
    let fetchedUserId: string;

    return this.authService.userId.pipe(
      take(1),
      switchMap(userId=>{
        fetchedUserId=userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token)=>{
        newOffer = new Offer(null,
          type,cryptocurrency,quantity,fetchedUserId, location, userName, contact);
        return this.http.post<{name: string}>(`https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/offers.json?auth=${token}`,
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
    return this.authService.token.pipe(
      take(1),
    switchMap((token)=>{
      return this.http.
      get<{[key:string]:OfferData}>(`https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/offers.json?auth=${token}`
      );
    }),
    map((offerData)=>{
        const offers: Offer[] = [];
        for(const key in offerData){
          if(offerData.hasOwnProperty(key)){
            offers.push(new Offer(key,offerData[key].type,offerData[key].coinName,offerData[key].quantity, offerData[key].userId, offerData[key].location,
              offerData[key].userName, offerData[key].contact));
          }
        }
        return offers;
      }),
      tap(offers=>{
        this._offers.next(offers);
      })
    );
  }

  deleteOffer(id: string) {
    console.log(id);
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(
          `https://cryptopanda-ionic-default-rtdb.europe-west1.firebasedatabase.app/offers/${id}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.offers;
      }),
      take(1),
      tap((offers) => {
        this._offers.next(offers.filter((q) => q.id !== id));
      })
    );
  }

}

