/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myportfolio',
  templateUrl: './myportfolio.page.html',
  styleUrls: ['./myportfolio.page.scss'],
})
export class MyportfolioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/

import {Component, Output} from '@angular/core';

@Component({
  selector: 'app-myporfolio',
  templateUrl: './myportfolio.page.html',
  styleUrls: ['./myportfolio.page.scss']
})
export class MyportfolioPage {
  text = 'quote';
  author = 'author';
  fullQuote = 'full quote';


  onAddQuote(): void {
    console.log('Coin added');
    this.fullQuote = `'${this.text}' - ${this.author}`;
  }

  onChangeOfAuthor(event: Event): void {
    console.log(event);
    console.log(event.target);
    this.author = (event.target as HTMLInputElement).value;
  }

}
