import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Cryptocurrency} from "../../cryptocurrency.model";
import {ModalController} from "@ionic/angular";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-market-modal',
  templateUrl: './market-modal.component.html',
  styleUrls: ['./market-modal.component.scss'],
})
export class MarketModalComponent implements OnInit {

  @ViewChild('f',{static:true}) form: NgForm;
  @Input() title: string;

  public cryptos$: Cryptocurrency[] | any;

  constructor(private modalCtr: ModalController,private dataService: DataService) { }

  ngOnInit() {
    return this.dataService.getPrices().subscribe( (data: any) => this.cryptos$ = data);
  }

  onCancel(){
    this.modalCtr.dismiss();
  }

  onAddOffer(){
    if(!this.form.valid){
      return;
    }
    this.modalCtr.dismiss({offerData:{cryptocurrency: this.form.value['cryptocurrency'],
        type:this.form.value['type'],quantity:this.form.value['quantity']}},'confirm');
  }

}
