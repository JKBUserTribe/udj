import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  username: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router;
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Check if required fields are filed
    if(!this.validateService.validateRegister(user)){
      this._flashMessagesService.show('Please fill in all the missing fields', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this._flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    // Register Username
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this._flashMessagesService.show('User has been registered', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/login']);
      } else {
        this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/register']);
      }
    });
  }

}
