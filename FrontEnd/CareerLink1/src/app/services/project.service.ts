import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { Expense } from '../models/Expense';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl: string = 'http://localhost:8086/spring2024/Project/';

  constructor(private http: HttpClient, private userService: UserService) {}

  findAllProjects(): Observable<Project[]> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.get<Project[]>(`${this.baseUrl}getAll`, { headers });
  }

  getProjectById(id: number): Observable<Project> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.get<Project>(`${this.baseUrl}get/${id}`, { headers });
  }

  createProject(project: Project): Observable<Project> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.post<Project>(`${this.baseUrl}create`, project, { headers });
  }

  updateProject(project: Project): Observable<Project> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.put<Project>(`${this.baseUrl}update`, project, { headers });
  }

  deleteProject(id: number): Observable<void> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.delete<void>(`${this.baseUrl}delete/${id}`, { headers });
  }

  

}