import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {DataService} from "../../data.service";
import {Cryptocurrency} from "../../cryptocurrency.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-myportfolio-modal',
  templateUrl: './myportfolio-modal.component.html',
  styleUrls: ['./myportfolio-modal.component.scss'],
})
export class MyportfolioModalComponent implements OnInit {

  @ViewChild('f',{static:true}) form: NgForm;
  @Input() title: string;

  public cryptos$: Cryptocurrency[] | any;

  constructor(private modalCtr: ModalController,private dataService: DataService,) { }

  ngOnInit() {
    return this.dataService.getPrices().subscribe( (data: any) => this.cryptos$ = data);
  }

  onCancel(){
    this.modalCtr.dismiss();
  }

  onAddCoin(){
    if(!this.form.valid){
      return;
    }
    this.modalCtr.dismiss({coinData:{cryptocurrency: this.form.value['cryptocurrency'],
      price:this.form.value['price'],quantity:this.form.value['quantity'],date:this.form.value['date']}},'confirm');
  }

}
