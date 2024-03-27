import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationResponse } from 'src/app/models/AuthenticationResponse';
import { RegisterRequest } from 'src/app/models/RegisterRequest';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  message = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  registerUser() {
    this.message = '';
    this.userService.register(this.registerRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.authResponse = response;
            console.log('Registration Successful');
            this.message = 'Account created successfully\nYou will be redirected to the Login page in 3 seconds';
          setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000)
          }
        },
        error: (error) => {
          console.error('Error during registration:', error);
        }
      });
  }
  

  
}
