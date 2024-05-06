import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recruitment } from '../models/Recruitment';
import { Observable, catchError, throwError } from 'rxjs';
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
      console.log("Token found:", token);
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

findAllRecs(): Observable<Recruitment[]> {
    const headers = this.addTokenToHeaders(new HttpHeaders());
    return this.http.get<Recruitment[]> ( this.baseUrl + 'getAll', { headers } )
  }
  
  // addRecruitment(recruitment: Recruitment): Observable<Recruitment> {
  //   const headers = this.addTokenToHeaders(new HttpHeaders());
  //   return this.http.post<Recruitment>(this.baseUrl + 'add', recruitment, { headers })
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error adding recruitment:', error);
  //         return throwError(error);
  //       })
  //     );
  // }
  addRecruitment(formData: FormData): Observable<Recruitment> {
    const headers = this.addTokenToHeaders(new HttpHeaders());
    return this.http.post<Recruitment>(this.baseUrl + 'add', formData, { headers });
  }
  importRecruitments(formData: FormData): Observable<any> {
    const headers = this.addTokenToHeaders(new HttpHeaders());
    return this.http.post<any>(this.baseUrl + 'import', formData, { headers });
  }
  
  getCV(id: number) {
    const headers = this.addTokenToHeaders(new HttpHeaders());
    return this.http.get(this.baseUrl +'downloadFile/' + id, { headers, responseType: 'blob' })
      .pipe(
        catchError(error => {
          if (error.error === 'alert') {
            return throwError('alert');
          }
          return throwError(error);
        })
      );
  }

  updateRecruitment(id: number, formData: FormData): Observable<Recruitment> {
    const headers = this.addTokenToHeaders(new HttpHeaders());
    return this.http.put<Recruitment>(`${this.baseUrl}update/${id}`, formData, { headers });
  }
  

deleteRecruitment(id: number) : Observable<void> { 
  const headers = this.addTokenToHeaders(new HttpHeaders()); 
  return this.http.delete <void> ( this.baseUrl + 'delete/' + id, { headers } ); 
}
}
