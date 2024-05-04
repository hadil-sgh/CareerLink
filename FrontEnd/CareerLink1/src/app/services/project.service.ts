import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/Project';
import { UserService } from './user.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl: string = 'http://localhost:8086/spring2024/Project/';

  constructor(private http: HttpClient, private userService: UserService, private jwtHelper: JwtHelperService) {}

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  private getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.sub; 
    }
    return '';
  }

  private addTokenToHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage.');
    }
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    console.log('Headers with token:', headers);
    return headers;
  }

  findAllProjects(): Observable<Project[]> {
    const headers = this.addTokenToHeaders();
    return this.http.get<Project[]>(`${this.baseUrl}getAll`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getProjectById(id: number): Observable<Project> {
    const headers = this.addTokenToHeaders();
    return this.http.get<Project>(`${this.baseUrl}get/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  createProject(project: Project): Observable<Project> {
    const headers = this.addTokenToHeaders();
    return this.http.post<Project>(`${this.baseUrl}create`, project, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateProject(project: Project): Observable<Project> {
    const headers = this.addTokenToHeaders();
    return this.http.put<Project>(`${this.baseUrl}update`, project, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteProject(id: number): Observable<void> {
    const headers = this.addTokenToHeaders();
    return this.http.delete<void>(`${this.baseUrl}delete/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
