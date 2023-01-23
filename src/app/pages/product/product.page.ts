import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, scan, skip, switchMap, tap } from 'rxjs';
import { ProductService } from 'src/app/services/api/product.services';

interface InfiniteScrollCustomEvent extends CustomEvent {
  target: HTMLIonInfiniteScrollElement;
}
interface RefresherCustomEvent extends CustomEvent {
  target: HTMLIonRefresherElement;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  searchText = null;
  isLoading=true;
  isScrollEnd=false;
  layoutGrid: boolean = true

  page=1;
  limit=10;
  total:number | undefined;
  
  #infiniteEvent: InfiniteScrollCustomEvent | undefined;
  #refresherEvent: RefresherCustomEvent | undefined;
  page$ = new BehaviorSubject({ page: this.page, limit: this.limit, skip:0 });
  products$ = new Observable<any[]>();
  productTrack$ = new BehaviorSubject([]);

  constructor(
    private productService:ProductService
  ) { }

  ngOnInit() {
    this.initProducts();
  }

  initProducts() {
    this.page$ = new BehaviorSubject({ page: this.page, limit: this.limit, skip:0 });
    this.products$ = this.page$.pipe(
      switchMap(({ page, limit, skip }) => this.loadProducts(page, limit, skip)),
      scan((acc: any[], items: any[]) => [...acc, ...items]),
      tap(() => {
        if (this.#infiniteEvent) {
          this.#infiniteEvent.target.complete();
          // this.#infiniteEvent = null;
        }
        if (this.#refresherEvent) {
          this.#refresherEvent.target.complete();
          // this.#refresherEvent = null;
        }
      })
    );
  }
  loadProducts(page: number, limit: number, skip:number) {
    let params = {
      page: page,
      limit: limit,
      skip: skip
    }
    
    return this.productService.getProduct(params).pipe(
      tap((data) => {
        this.total=data.total;
        this.isLoading=false;
        if (data.products.length === data.total) {
          this.isScrollEnd = true;
        }
        this.productTrack$.next(data.products)
      }),
      map((data:any) => data.products),
      catchError(() => {
        return of([]);
      })
    );
  }
  loadMoreProducts(event:any) {
    this.page += 1;
    this.#infiniteEvent = event;
    this.page$.next({ page: this.page, limit: this.limit, skip:((this.limit*this.page)-this.limit) });
  }
  
  priceInfo(data:any){}

  openProductDetail(data:any){}
}
