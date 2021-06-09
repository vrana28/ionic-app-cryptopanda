import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {map, switchMap, take, tap} from "rxjs/operators";
import {Offer, TypeOfOffer} from "../market/offer.model";
import {BehaviorSubject} from "rxjs";

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
export class ProfileService {

  private _offers = new BehaviorSubject<Offer[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get offers(){
    return this._offers.asObservable();
  }

  getOffers(id){
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
          if(offerData.hasOwnProperty(key) && offerData[key].userId==id){
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

}
