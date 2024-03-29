import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'http://localhost:8086/spring2024/User/';

  constructor(private http :HttpClient) {  }

  findAllUsers(): Observable<User[]>{
    return this.http.get<User[]> ( this.baseUrl + 'getAll' )
  }

  addUser(user: User) : Observable<User> {
    return this.http.post<User> ( this.baseUrl + 'add', user );
  }

  updateUser(user: User) : Observable<User> {
    return this.http.put<User> ( this.baseUrl + 'update', user);
  }

  deleteUser(id: number) : Observable<void> {
    return this.http.delete <void> ( this.baseUrl + 'delete/' + id )
  }
  
  /* findoneuser(id: number): Observable<User> {
    return this.http.get<User[]>(this.baseUrl + 'getOne/' + id).pipe(
      map(users => users[0])
    );
  } */
}
