import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl: string = 'http://localhost:8086/spring2024/Team/';

  constructor(private http :HttpClient) {  }

  getAllTeam(): Observable<Team[]>{
    return this.http.get<Team[]> ( this.baseUrl + 'getAll' )
  }

  addTeam(team: Team) : Observable<Team> {
    return this.http.post<Team> ( this.baseUrl + 'add', team );
  }

  updateTeam(team: Team) : Observable<Team> {
    return this.http.put<Team> ( this.baseUrl + 'update', team);
  }

  deleteTeam(id: number) : Observable<void> {
    return this.http.delete <void> ( this.baseUrl + 'delete/' + id )
  }
  

}


  
