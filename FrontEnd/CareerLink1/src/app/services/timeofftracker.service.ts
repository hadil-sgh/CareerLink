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

  TakeTiMEOff( timeoff :TimeOffTracker) :Observable<TimeOffTracker> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.post<TimeOffTracker>(this.baseUrl +'add',timeoff,{headers})
  }
  
  deleteTiMEOff(id: number): Observable<void> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
        return this.http.delete<void> (this.baseUrl + 'delete/' + id, {headers});
    }
    
  updateTiMEOff(timeoff :TimeOffTracker) : Observable<TimeOffTracker> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
      return this.http.put<TimeOffTracker> ( this.baseUrl + 'update', timeoff, {headers});
    }

    getPdf(id: number) {
      const headers = this.userService.addTokenToHeaders(new HttpHeaders());
      return this.http.get(this.baseUrl +'downloadFile/' + id, { responseType: 'blob' ,headers});
    }
  
}
