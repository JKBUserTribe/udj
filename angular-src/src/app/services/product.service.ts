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

  getProduct(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('http://localhost:3000/products/details', {headers: headers})
  }﻿
/*
  getProducts(): Observable<Product[]> {
    // TODO: send the message _after_ fetching the heroes
    this._flashMessagesService.show(`ProductService: fetched products`, {
      cssClass: 'alert-success',
    });
    return of(PRODUCTS);
  }

  getProduct(id: number): Observable<Product> {
    // TODO: send the message _after_ fetching the hero
    this._flashMessagesService.show(`ProductService: fetched product id=${id}`, {
      cssClass: 'alert-success',
    });
    return of(PRODUCTS.find(product => product.id === id));
  }
  */
}
