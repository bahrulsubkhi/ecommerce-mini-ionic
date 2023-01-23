/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RupiahPipe } from '../../pipes/rupiah.pipe';

export enum CardType {
  grid = 'grid',
  list = 'list',
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  providers: [RupiahPipe]
})
export class ProductCardComponent implements OnInit {
  @Input() cardType: any;
  @Input() product: any;
  @Input() hidePriceInfo= null;
  @Input() minHeight = null; // khusus grid
  @Input() width = null;
  @Input() isLoading = false;
  @Output() showPriceInfo: EventEmitter<any> = new EventEmitter();
  cardTypeValue = CardType;
  city: any;

  constructor(
    private modalCtrl: ModalController,
    private rupiah: RupiahPipe,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cardType = this.cardType ?? CardType.grid;
  }

  onClickPriceInfo() {
  }

  get price() {
    return this.rupiah?.transform(this.product.price);
  }
  get discount(){
    let nominal =(this.product.discountPercentage/100)*this.product.price
    return this.rupiah?.transform(nominal);
  }

  async addingToCart() {
  }
}
