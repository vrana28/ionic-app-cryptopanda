import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {User} from "./user.model";
import {map, tap} from "rxjs/operators";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  location: string;
  telephone: number;
  points: number;
  name: string;
  expiresIn: string;
  registered?: boolean;
}

interface UserData {
    name?: string;
    surname?: string;
    email: string;
    password: string;
    location: string;
    telephone: number;
    points: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuthenticated = false;
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  get isUserAuthenticated() {
    return this._user.asObservable().pipe(
      map((user)=>{
        if(user){
          return !!user.token;
        }else{
          return false;
        }
      })
    );
  }

  get userId(){
    return this._user.asObservable().pipe(
      map((user)=>{
        if(user){
          return user.id;
        }else{
          return null;
        }
      })
    );
  }

  get token(){
    return this._user.asObservable().pipe(
      map((user)=>{
        if(user){
          return user.token;
        }else{
          return null;
        }
      })
    );
  }

  register(user: UserData){
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      {email:user.email, password: user.password, location: user.location, telephone: user.telephone, points: user.points, returnSecureToken: true})
      .pipe(
        tap((userData)=>{
          const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
          const user = new User(userData.localId, userData.name, userData.email, userData.location,
            userData.telephone, userData.points, userData.idToken, expirationTime);
          this._user.next(user);
        })
      );
  }

  logIn(user: UserData){
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
      {email:user.email, password: user.password, name: user.name, location: user.location, telephone: user.telephone,points: user.points, returnSecureToken: true})
      .pipe(
        tap((userData)=>{
          const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
          const user = new User(userData.localId, userData.name, userData.email, userData.location,
            userData.telephone, userData.points, userData.idToken, expirationTime);
            this._user.next(user);
        })
      );
  }

  logOut(){
    this._user.next(null);
  }

}
