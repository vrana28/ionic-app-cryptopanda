import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import firebase from "firebase";
import {User} from "../auth/user.model";
import {LogInPage} from "../auth/log-in/log-in.page";
import {OfferService} from "../market/offer.service";
import {ProfileService} from "./profile.service";
import {Offer} from "../market/offer.model";
import {MyportfolioPage} from "../myportfolio/myportfolio.page";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user: Offer;
  name: string;
  offers: Offer[];
  public balance: number=MyportfolioPage.balance;

  public userName:string;
  public location: string;
  public telephone: number;


  constructor(private auth:AuthService, private profileService:ProfileService) { }

  ngOnInit() {


  }

  ionViewWillEnter(){
    this.balance = MyportfolioPage.balance;
    console.log("korisnik id"+LogInPage.idCurrent);
    console.log(LogInPage.idCurrent);
    this.profileService.getOffers(LogInPage.idCurrent).subscribe((offer)=>{
      this.offers = offer;
      this.user = this.offers[0];
      this.userName = this.user.userName;
      this.location = this.user.location;
      this.telephone = this.user.contact;
    });
  }

}
