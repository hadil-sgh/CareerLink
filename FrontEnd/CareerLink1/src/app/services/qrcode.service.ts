import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8086/spring2024/qr/qrcode/'; 

  generateQrCode(content: string): Observable<Blob> {
    const url = `${this.baseUrl}${content}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
