import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from './search.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent]
})
export class SearchModule {}