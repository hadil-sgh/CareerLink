import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import{Performance} from 'src/app/models/Performence';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  private baseUrl = 'http://localhost:8086/spring2024/Performance';

  constructor(private http: HttpClient, private userService:UserService, private jwtHelper: JwtHelperService) { }



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

  deletePerformance(id: number): Observable<void> {
        const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`,{headers});
  }

  
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}