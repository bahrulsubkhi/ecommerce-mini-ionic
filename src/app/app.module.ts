import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import localeId from '@angular/common/locales/id';

registerLocaleData(localeId);

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LazyLoadImageModule,
    BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    DecimalPipe,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'IDR' },
    { provide: LOCALE_ID, useValue: 'id' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
