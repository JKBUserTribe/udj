import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';

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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
  }

  authenticateUser(user){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
  }

  getProfile(){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
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
    this.loadToken();

    if (this.authToken == undefined ){
      return true
     } else {
       const helper = new JwtHelperService();
       return helper.isTokenExpired(this.authToken);
     }
  }

  isRole(role)  {
    const expectedRole = role;
    const token = localStorage.getItem('id_token');
    const tokenPayload = decode(token);

    this.loggedIn();

    if ( this.loggedIn() || tokenPayload.data.role !== expectedRole ) {
      return false;
    }
      return true;
  }

  logout(){
    this.authToken = null;
    this.user = null;

    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
  }
}
