import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { UserService } from './user.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import{Performance} from 'src/app/models/Performence';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  private baseUrl = 'http://localhost:8086/spring2024/Performance';

  constructor(private http: HttpClient, private userService:UserService, private jwtHelper: JwtHelperService) { }
  
  
  findPeformancesbysession(): Observable<Performance[]> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    const email = this.getUserIdFromToken();
    const encodedEmail = encodeURIComponent(email); 
    const url = `${this.baseUrl}/getAllbymail/${encodedEmail}`; 
    return this.http.get<Performance[]>(url, {headers}); 
  }
  getAverageImprovementInAYear(): Observable<Map<number, number>> {
    return this.http.get<Map<number, number>>(`${this.baseUrl}/arraveofayear`);
  }

  getAveragePerformance(): Observable<Map<number, number>> {
    return this.http.get<Map<number, number>>(`${this.baseUrl}/AvragePerformance`);
  }
  getBestPerformance(): Observable<Performance> {
    return this.http.get<Performance>(`${this.baseUrl}/best`);
  }
  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.sub; 
    }
    return '';
  }

  addPerformance(performance: Performance): Observable<Performance> {
        const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.post<Performance>(`${this.baseUrl}/add`, performance,{headers});
  }

  updatePerformance(performance: Performance): Observable<Performance> {
        const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.put<Performance>(`${this.baseUrl}/update`, performance,{headers});
  }

  getOnePerformance(id: number): Observable<Performance> {
        const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.get<Performance>(`${this.baseUrl}/getOne/${id}`,{headers});
  }

  getAllPerformance(): Observable<Performance[]> {
        const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.get<Performance[]>(`${this.baseUrl}/getAll`,{headers});
  }
  getTeamNamesByUser(userId: number): Observable<string[]> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.get<string[]>(`${this.baseUrl}/team/${userId}`,{headers});
  }

  deletePerformance(id: number): Observable<void> {
        const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`,{headers});
  }
  filterbyyearMonth(year:number,month:number){
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.get<Performance[]>(`${this.baseUrl}/filter/${year}/${month}`,{headers});

  }

  getTasksForUserThisMonth(userId: number): Observable<Task[]> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    const url = `${this.baseUrl}/tasks/${userId}`;
    console.log('Requesting tasks for user with ID:', userId); // Log request initiation
    return this.http.get<Task[]>(url, { headers }).pipe(
      tap((tasks: Task[]) => {
        console.log('Received tasks for user with ID:', userId, 'Tasks:', tasks); // Log successful response
      }),
      catchError((error) => {
        console.error('Error fetching tasks for user with ID:', userId, 'Error:', error); // Log error response
        throw error; // Rethrow the error to be handled by the caller
      })
    );
  }
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}