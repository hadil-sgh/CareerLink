import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeOffTracker } from '../models/TimeOffTracker';

@Injectable({
  providedIn: 'root'
})
export class TimeofftrackerService {
  private baseUrl: string = 'http://localhost:8086/spring2024/TimeOffTracker/';

  constructor(private http :HttpClient) { }

  findAllTimesOff():Observable<TimeOffTracker[]> {

    return this.http.get<TimeOffTracker[]>(this.baseUrl +'getAll')
  }


}
