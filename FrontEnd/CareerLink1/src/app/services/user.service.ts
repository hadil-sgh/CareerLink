import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://localhost:8086/spring2024/User/';

  constructor(private http :HttpClient) {  }

  findAllUsers(): Observable<User[]>{
    return this.http.get<User[]> (this.baseUrl + 'getAll')
  }

  addUser(user: User) : Observable<User> {
    return this.http.post<User> ( this.baseUrl + 'add', user);
  }
  

}
