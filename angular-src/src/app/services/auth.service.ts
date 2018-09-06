import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http:HttpClient
  ) { }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
  }

  getProfile(){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken;
    });
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
  }﻿

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  loggedIn(){
    //console.log(this.jwtHelper.isTokenExpired());
  }

  logout(){
    this.authToken = null;
    this.user = null;

    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
  }
}
