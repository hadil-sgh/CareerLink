import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeOffTracker } from '../models/TimeOffTracker';
import { UserService } from './user.service';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class TimeofftrackerService {

  private baseUrl: string = 'http://localhost:8086/spring2024/TimeOffTracker/';
  Email: string | undefined;  
  constructor(private http :HttpClient, private userService:UserService, private jwtHelper: JwtHelperService) { }
  

  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.sub; 
    }
    return '';
  }
  
  findAllTimesOff():Observable<TimeOffTracker[]> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.get<TimeOffTracker[]>(this.baseUrl +'getAll',{headers})
  }

  findtimesoffbysession(): Observable<TimeOffTracker[]> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    const email = this.getUserIdFromToken();
    const encodedEmail = encodeURIComponent(email); 
    const url = `${this.baseUrl}getbyuser?email=${encodedEmail}`; 
    return this.http.get<TimeOffTracker[]>(url, { headers }); 
  }
  
  TakeTiMEOff(formData: FormData): Observable<any> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    const url = `${this.baseUrl}add`;
    return this.http.post<any>(url,formData,{headers});
  }


 /*  TakeTiMEOff( timeoff :TimeOffTracker) :Observable<TimeOffTracker> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.post<TimeOffTracker>(this.baseUrl +'add',timeoff,{headers});
  } */

 
  
  deleteTiMEOff(id: number): Observable<void> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
        return this.http.delete<void> (this.baseUrl + 'delete/' + id, {headers});
    }
    updateTimeOff(id: number, timeoff: TimeOffTracker): Observable<TimeOffTracker> {
      const headers = this.userService.addTokenToHeaders(new HttpHeaders());
      const url = `${this.baseUrl}update/${id}/${timeoff}`;
      return this.http.put<any>(url,{}, {headers});
    }
    updateStatus(id: number, newStatus: string): Observable<any> {
      const headers = this.userService.addTokenToHeaders(new HttpHeaders());
      const url = `${this.baseUrl}status/${id}/${newStatus}`; // Constructing the URL properly
      return this.http.put<any>(url, {},{headers});
  }

    getPdf(id: number) {
      const headers = this.userService.addTokenToHeaders(new HttpHeaders());
      return this.http.get(this.baseUrl +'downloadFile/' + id, { responseType: 'blob' ,headers});
    }
    findoneTimesOff(id: number): Observable<TimeOffTracker> {
      return this.http.get<TimeOffTracker>(this.baseUrl + 'getOne/' + id);
    }

 
  
  getLeaveStatistics(year: number): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}leave/statistics?year=${year}`);
  }
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

