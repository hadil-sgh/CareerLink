import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/User';
import { RegisterRequest } from '../models/RegisterRequest';
import { AuthenticationResponse } from '../models/AuthenticationResponse';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import { RouteReuseStrategy, Router } from '@angular/router';
import { VerificationRequest } from '../models/VerificationRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://localhost:8086/spring2024/';

  constructor(private http :HttpClient, private router: Router) {  }

   addTokenToHeaders(headers: HttpHeaders) {
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

findAllUsers(): Observable<User[]> {
    const headers = this.addTokenToHeaders(new HttpHeaders());
    return this.http.get<User[]> ( this.baseUrl + 'User/getAll', { headers } )
  }
  
addUser(user: User) : Observable<User> { 
  const headers = this.addTokenToHeaders(new HttpHeaders()); 
  return this.http.post<User> ( this.baseUrl + 'User/add', user, { headers } ); 
}

updateUser(user: User) : Observable<User> { 
  const headers = this.addTokenToHeaders(new HttpHeaders()); 
  return this.http.put<User> ( this.baseUrl + 'User/update', user, { headers }); 
}

deleteUser(id: number) : Observable<void> { 
  const headers = this.addTokenToHeaders(new HttpHeaders()); 
  return this.http.delete <void> ( this.baseUrl + 'User/delete/' + id, { headers } ); 
}


  
   getUser(id:number): Observable<User> {
    const headers = this.addTokenToHeaders(new HttpHeaders());
    return this.http.get<User> ( this.baseUrl + 'User/getOne' + id, { headers } )
  } 

  


  // Register & Login & Logout

  register(registerRequest: RegisterRequest) {
    return this.http.post<AuthenticationResponse> (`${this.baseUrl}auth/register`, registerRequest);
  }

  login(authRequest: AuthenticationRequest) {
    return this.http.post<AuthenticationResponse> (`${this.baseUrl}auth/authenticate`, authRequest);
  }


  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse> (`${this.baseUrl}auth/verify`, verificationRequest);
  }
  
  urllogout() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete(`${this.baseUrl}auth/logout`, { headers });
  }

  logout() {
    this.urllogout()
      .subscribe(
        () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Logout error:', error);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      );
  }
}
