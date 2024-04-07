import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../models/Expense';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl: string = 'http://localhost:8086/spring2024/Expense/';

  constructor(private http :HttpClient, private userService:UserService) {  }
  findAllExpense(): Observable<Expense[]>{
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.get<Expense[]> ( this.baseUrl + 'getAll', {headers} )
  }


  addExpenseAndAffect(idProject: number, idStock: number, expense: Expense): Observable<Expense> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.post<Expense>(`${this.baseUrl}addAndAffect/${idProject}/${idStock}`, expense, {headers});
  }


  addExpense(expense: Expense) : Observable<Expense> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.post<Expense> ( this.baseUrl + 'add', expense ,{headers});
  }

  updateExpense(expense: Expense) : Observable<Expense> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.put<Expense> ( this.baseUrl + 'update', expense,{headers});
  }

  deleteExpense(id: number) : Observable<void> {
    const headers = this.userService.addTokenToHeaders(new HttpHeaders());
    return this.http.delete <void> ( this.baseUrl + 'delete/' + id ,{headers})
  }

}
