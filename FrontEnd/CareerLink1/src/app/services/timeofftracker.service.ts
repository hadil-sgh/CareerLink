import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { TimeOffTracker } from '../models/TimeOffTracker';
import { UserService } from './user.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Task } from '../models/Task';
import { Daysoffbyrole } from '../models/Daysoffbyrole';
import { Blackoutperiods } from '../models/Blackoutperiods';


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
      const url = `${this.baseUrl}update/${id}`;
      return this.http.put<any>(url,timeoff, {headers});
    }
    
    updateStatus(id: number, newStatus: string): Observable<any> {
      const headers = this.userService.addTokenToHeaders(new HttpHeaders());
      const url = `${this.baseUrl}status/${id}/${newStatus}`; 
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

  getCurrentWeekGrade(id: number): Observable<number> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.get<number>(`${this.baseUrl}currentWeek?idle=${id}`, { headers });
  }
  addDaysoff(daysoffbyrole: Daysoffbyrole): Observable<Daysoffbyrole> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.post<Daysoffbyrole>(`${this.baseUrl}adddaysoff`, daysoffbyrole, { headers });
  }

  addBlackout(blackoutperiods: Blackoutperiods): Observable<Blackoutperiods> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.post<Blackoutperiods>(`${this.baseUrl}addblackout`, blackoutperiods, { headers });
  }
  getTasksForUserThisMonth(userId: number): Observable<Task[]> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    const url = `${this.baseUrl}tasks/${userId}`;
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
  updateDaysoff(daysoffbyrole: Daysoffbyrole): Observable<Daysoffbyrole> {
        const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.put<Daysoffbyrole>(`${this.baseUrl}updatedayoff`, daysoffbyrole, { headers });
  }

  deleteDaysoff(id: number): Observable<void> {
        const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.delete<void>(`${this.baseUrl}deletedayoff/${id}`, { headers });
  }

  getAllDaysoff(): Observable<Daysoffbyrole[]> {
        const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.get<Daysoffbyrole[]>(`${this.baseUrl}getAlldayoff`, { headers });
  }
  updateBlackoutperiods(blackoutperiods: Blackoutperiods): Observable<Blackoutperiods> {
            const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.put<Blackoutperiods>(`${this.baseUrl}updatBlackoutperiods/${blackoutperiods.id}`, blackoutperiods, { headers });
  }

  deleteBlackoutperiods(id: number): Observable<void> {
            const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.delete<void>(`${this.baseUrl}deleteBlackoutperiods/${id}`, { headers });
  }

  getAllBlackoutperiods(): Observable<Blackoutperiods[]> {
            const headers = this.userService.addTokenToHeaders(new HttpHeaders());

    return this.http.get<Blackoutperiods[]>(`${this.baseUrl}getAllBlackoutperiods`, { headers });
  }


  getDayOffByRole(id: number): Observable<number> {
    console.log('hi:'); 

    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    console.log('get days off for the role of this user:', id); 

    return this.http.get<number>(`${this.baseUrl}getroledayoff/${id}`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching day off:', error);
          throw error;
        })
      );
  }
  getTotalTimeOff(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}total/${userId}`);
  }
}


function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

