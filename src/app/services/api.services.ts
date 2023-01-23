import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from "src/environments/environment";
import { catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    constructor(
        private http: HttpClient,
    ) {}
    get(endpoint: string, params: any, public_token: any = false) {
    const headers = new HttpHeaders({
        Authorization:''
    });
    return this.http.get<any>(SERVER_URL + endpoint, { headers, params }).pipe(
        catchError((err) => {
        return throwError(err);
        })
    );
    }
  }