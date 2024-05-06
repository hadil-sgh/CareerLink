
import { Component, HostListener, Renderer2, ElementRef } from '@angular/core';
import { AuthenticationRequest } from 'src/app/models/AuthenticationRequest';
import { AuthenticationResponse } from 'src/app/models/AuthenticationResponse';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {
  constructor(private userService:UserService){}
  authRequest: AuthenticationRequest = {};
  authResponse: AuthenticationResponse = {};
  users: User[] = [];


  ngOnInit(): void {}
  isAdminUser(): boolean {
    return this.authResponse.userRole = JSON.parse(localStorage.getItem('userRole') as string);

  }
  
  
  logout():void{this.userService.logout();}
  
}
