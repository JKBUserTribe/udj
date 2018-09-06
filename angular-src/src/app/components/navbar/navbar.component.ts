import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Object;
  currentUser: Object;

  constructor(
    private authService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    if(!this.authService.loggedIn()){
      this.authService.getProfile().subscribe((profile: any) => {
        this.currentUser = profile.user;
      },
      err => {
        console.log(err);
        return false;
      })
    }
  }

  onLogoutClick(){
    this.authService.logout();
    this._flashMessagesService.show('You have been successfully logged out', {
      cssClass: 'alert-success',
    });
    this.router.navigate(['/'])
    return false;
  }
}
