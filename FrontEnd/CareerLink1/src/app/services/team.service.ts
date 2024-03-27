import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/Team';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl: string = 'http://localhost:8086/spring2024/Team/';

  constructor(private http :HttpClient, private userService:UserService) {  }

  getAllTeam(): Observable<Team[]>{
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.get<Team[]> ( this.baseUrl + 'getAll',{headers} )
  }

  addTeam(team: Team) : Observable<Team> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.post<Team> ( this.baseUrl + 'add', team ,{headers});
  }

  updateTeam(team: Team) : Observable<Team> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.put<Team> ( this.baseUrl + 'update', team,{headers});
  }

  deleteTeam(id: number) : Observable<void> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.delete <void> ( this.baseUrl + 'delete/' + id ,{headers})
  }
  

}


  
