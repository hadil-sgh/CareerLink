import { HttpClient, HttpResponse } from '@angular/common/http';
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

 
  

  constructor(private http :HttpClient) { }

  findAllTimesOff():Observable<TimeOffTracker[]> {

    return this.http.get<TimeOffTracker[]>(this.baseUrl +'getAll')
  }

  TakeTiMEOff(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'add', formData);
  }
  
  deleteTiMEOff(id: number): Observable<void> {
        return this.http.delete<void> (this.baseUrl + 'delete/' + id);
    }
    updateTimeOff(id: number, timeoff: TimeOffTracker): Observable<TimeOffTracker> {
      return this.http.put<TimeOffTracker>(this.baseUrl+'update/'+ id , timeoff);
    }
    
    getPdf(id: number) {
      return this.http.get(this.baseUrl +'downloadFile/' + id, { responseType: 'blob' });
    }
    findoneTimesOff(id: number): Observable<TimeOffTracker> {
      return this.http.get<TimeOffTracker>(this.baseUrl + 'getOne/' + id);
    }

    updateStatus(id: number, newStatus: string): Observable<any> {
      const url = `${this.baseUrl}status/${id}/${newStatus}`; // Constructing the URL properly
      return this.http.put<any>(url, {});
  }
  
  getLeaveStatistics(year: number): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}leave/statistics?year=${year}`);
  }
}
