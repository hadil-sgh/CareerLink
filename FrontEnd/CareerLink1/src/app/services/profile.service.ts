import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Profile } from '../models/Profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl: string = 'http://localhost:8086/spring2024/Profile/';

  constructor(private http :HttpClient, private userService:UserService) {  }
  findAllProfile(): Observable<Profile[]>{
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.get<Profile[]> ( this.baseUrl + 'getAll',{headers} )
  }

  getProfile(id:number): Observable<Profile>{
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.get<Profile> ( this.baseUrl + 'getOne/'+id,{headers} )
  }

  addProfile(profile: Profile) : Observable<Profile> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.post<Profile> ( this.baseUrl + 'add', profile ,{headers});
  }

  updateProfile(profile: Profile) : Observable<Profile> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.put<Profile> ( this.baseUrl + 'update', profile,{headers});
  }

  deleteProfile(id: number) : Observable<void> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.delete <void> ( this.baseUrl + 'delete/' + id ,{headers})
  }
}
