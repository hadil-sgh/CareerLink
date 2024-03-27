import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../models/Stock';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl: string = 'http://localhost:8086/spring2024/Stock/';

  constructor(private http :HttpClient, private userService:UserService) {  }
  findAllStock(): Observable<Stock[]>{
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.get<Stock[]> ( this.baseUrl + 'getAll',{headers} )
  }

  addStock(stock: Stock) : Observable<Stock> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.post<Stock> ( this.baseUrl + 'add', stock ,{headers});
  }

  updateStock(stock: Stock) : Observable<Stock> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.put<Stock> ( this.baseUrl + 'update', stock,{headers});
  }

  deleteStock(id: number) : Observable<void> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.delete <void> ( this.baseUrl + 'delete/' + id ,{headers})
  }

}


