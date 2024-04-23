import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recruitment } from '../models/Recruitment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {

  private baseUrl: string = 'http://localhost:8086/spring2024/Recruitment/';

  constructor(private http :HttpClient, private router: Router) {  }

   addTokenToHeaders(headers: HttpHeaders) {
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

findAllRecs(): Observable<Recruitment[]> {
    const headers = this.addTokenToHeaders(new HttpHeaders());
    return this.http.get<Recruitment[]> ( this.baseUrl + 'getAll', { headers } )
  }
  
addRecruitment(recruitment: Recruitment) : Observable<Recruitment> { 
  const headers = this.addTokenToHeaders(new HttpHeaders()); 
  return this.http.post<Recruitment> ( this.baseUrl + 'add', recruitment, { headers } ); 
}

updateRecruitment(recruitment: Recruitment) : Observable<Recruitment> { 
  const headers = this.addTokenToHeaders(new HttpHeaders()); 
  return this.http.put<Recruitment> ( this.baseUrl + 'update',recruitment, { headers }); 
}

deleteRecruitment(id: number) : Observable<void> { 
  const headers = this.addTokenToHeaders(new HttpHeaders()); 
  return this.http.delete <void> ( this.baseUrl + 'delete/' + id, { headers } ); 
}
}
