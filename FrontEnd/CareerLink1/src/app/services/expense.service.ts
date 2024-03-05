import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../models/Expense';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl: string = 'http://localhost:8086/spring2024/Expense/';

  constructor(private http :HttpClient) {  }
  findAllExpense(): Observable<Expense[]>{
    return this.http.get<Expense[]> ( this.baseUrl + 'getAll' )
  }
  addExpenseAndAffect(idProject: number, idStock: number, expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.baseUrl}addAndAffect/${idProject}/${idStock}`, expense);
  }


  addExpense(expense: Expense) : Observable<Expense> {
    return this.http.post<Expense> ( this.baseUrl + 'add', expense );
  }

  updateExpense(expense: Expense) : Observable<Expense> {
    return this.http.put<Expense> ( this.baseUrl + 'update', expense);
  }

  deleteExpense(id: number) : Observable<void> {
    return this.http.delete <void> ( this.baseUrl + 'delete/' + id )
  }

}
