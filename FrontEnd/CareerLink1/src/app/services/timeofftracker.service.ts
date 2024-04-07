import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeOffTracker } from '../models/TimeOffTracker';
import { User } from '../models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TimeofftrackerService {
  private baseUrl: string = 'http://localhost:8086/spring2024/TimeOffTracker/';

 
  

  constructor(private http :HttpClient, private userService:UserService) { }

  findAllTimesOff():Observable<TimeOffTracker[]> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.get<TimeOffTracker[]>(this.baseUrl +'getAll',{headers})
  }

 /*  TakeTiMEOff( timeoff :TimeOffTracker) :Observable<TimeOffTracker> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.post<TimeOffTracker>(this.baseUrl +'add',timeoff,{headers});
  } */

  TakeTiMEOff(formData: FormData): Observable<any> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.post<any>(this.baseUrl + 'add', formData,{headers});
  }
  
  deleteTiMEOff(id: number): Observable<void> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
        return this.http.delete<void> (this.baseUrl + 'delete/' + id, {headers});
    }
    updateTimeOff(id: number, timeoff: TimeOffTracker): Observable<TimeOffTracker> {
      const headers = this.userService.addTokenToHeaders(new HttpHeaders());
      return this.http.put<TimeOffTracker>(this.baseUrl+'update/'+ id , timeoff, {headers});
    }
    

    
  updateTiMEOff(timeoff :TimeOffTracker) : Observable<TimeOffTracker> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
      return this.http.put<TimeOffTracker> ( this.baseUrl + 'update', timeoff, {headers});
    }


    getPdf(id: number) {
      const headers = this.userService.addTokenToHeaders(new HttpHeaders());
      return this.http.get(this.baseUrl +'downloadFile/' + id, { responseType: 'blob' ,headers});
    }
    findoneTimesOff(id: number): Observable<TimeOffTracker> {
      return this.http.get<TimeOffTracker>(this.baseUrl + 'getOne/' + id);
    }

    updateStatus(id: number, newStatus: string): Observable<any> {
      const headers = this.userService.addTokenToHeaders(new HttpHeaders());
      const url = `${this.baseUrl}status/${id}/${newStatus}`; // Constructing the URL properly
      return this.http.put<any>(url, {},{headers});
  }
  
  getLeaveStatistics(year: number): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}leave/statistics?year=${year}`);
  }
}
