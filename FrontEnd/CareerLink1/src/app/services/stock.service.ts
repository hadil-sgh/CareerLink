import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../models/Stock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl: string = 'http://localhost:8086/spring2024/Stock/';

  constructor(private http :HttpClient) {  }
  findAllStock(): Observable<Stock[]>{
    return this.http.get<Stock[]> ( this.baseUrl + 'getAll' )
  }

  addStock(stock: Stock) : Observable<Stock> {
    return this.http.post<Stock> ( this.baseUrl + 'add', stock );
  }

  updateStock(stock: Stock) : Observable<Stock> {
    return this.http.put<Stock> ( this.baseUrl + 'update', stock);
  }

  deleteStock(id: number) : Observable<void> {
    return this.http.delete <void> ( this.baseUrl + 'delete/' + id )
  }

}


