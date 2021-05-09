import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Cryptocurrency} from './cryptocurrency.model';

@Injectable()
export class DataService {

  result: any;

  constructor( private http: HttpClient) { }

  // @ts-ignore
  getPrices(): json{
    return this.http.get<Cryptocurrency[]>('https://api.nomics.com/v1/currencies/ticker?key=a32ca57641d2031c6c4eaa773352d669&ids=' +
      'BTC,ETH,XRP,LTC,LINK,ADA,DOGE,DOT,BNB&interval=1d,30d&convert=EUR&per-page=100&page=1');
  }

}
