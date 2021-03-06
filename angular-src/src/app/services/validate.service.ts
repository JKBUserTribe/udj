import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(!user.name || !user.email || !user.password || user.name.length == 0 || user.email.length == 0 || user.password.length == 0){
      return false;
    } else {
      return true;
    }
  }

  validateProduct(product){
    if(!product.name || !product.description || !product.brand || product.name.length == 0 || product.description.length == 0 || product.brand.length == 0){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
