import { Injectable } from "@angular/core";
import { ApiService } from "../api.services";

@Injectable({
    providedIn: 'root',
})
export class ProductService extends ApiService {
    getProduct(param:any) {
      return this.get(`products`,param, false)
    }
}