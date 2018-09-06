import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private authService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {

      email: this.email.toLowerCase(),
      password: this.password

    }

    this.authService.authenticateUser(user).subscribe((data: any) => {
      if(data.success){

        this.authService.storeUserData(data.token, data.user);

        this._flashMessagesService.show(data.msg, {
          cssClass: 'alert-success',
        });

        this.router.navigate(['/dashboard']);

      } else {

        this._flashMessagesService.show(data.msg, {
          cssClass: 'alert-danger',
        });

        this.router.navigate(['/login']);
      }
    })
  }
}
