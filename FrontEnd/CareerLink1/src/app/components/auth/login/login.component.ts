import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/models/AuthenticationRequest';
import { AuthenticationResponse } from 'src/app/models/AuthenticationResponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {};
  authResponse: AuthenticationResponse = {};

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  authenticate() {
    this.userService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          if (response.accessToken) {
            this.authResponse = response;
            localStorage.setItem('token', response.accessToken as string);
            console.log('Token saved in localStorage')
            this.router.navigate(['admin/user']);
          } else {
            console.error('Access token is missing in the response');
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
  }


}
