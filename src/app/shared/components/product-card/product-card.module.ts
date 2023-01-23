import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from './product-card.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CachedImageModule } from '../cached-image/cached-image.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CachedImageModule,
    LazyLoadImageModule
  ],
  declarations: [ProductCardComponent],
  exports: [ProductCardComponent]
})
export class ProductCardModule { }
