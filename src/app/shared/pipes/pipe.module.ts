import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RupiahPipe } from './rupiah.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RupiahPipe,
  ],
  exports: [
    RupiahPipe,
  ]
})
export class PipeModule { }
