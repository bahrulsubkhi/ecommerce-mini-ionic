import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CachedImageComponent } from './cached-image.component';
import { IonicModule } from '@ionic/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LazyLoadImageModule,
  ],
  exports: [CachedImageComponent],
  declarations: [CachedImageComponent],
})
export class CachedImageModule { }
