import { HttpClient } from '@angular/common/http';
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

  TakeTiMEOff( timeoff :TimeOffTracker) :Observable<TimeOffTracker> {

    return this.http.post<TimeOffTracker>(this.baseUrl +'add',timeoff)
  }
  
  deleteTiMEOff(id: number): Observable<void> {
        return this.http.delete<void> (this.baseUrl + 'delete/' + id);
    }

}
