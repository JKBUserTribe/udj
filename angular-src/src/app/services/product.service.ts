import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  authToken: any;
  product: any;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private http:HttpClient
  ) { }

  registerProduct(product){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/products/register', product, {headers: headers})
  }

  getProduct(id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/products/id', id, {headers: headers})
  }﻿

  getProducts(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get('http://localhost:3000/products/all', {headers: headers})
  }﻿
}
