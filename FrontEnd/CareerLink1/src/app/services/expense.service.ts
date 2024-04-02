import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../models/Expense';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  constructor(private http :HttpClient) {  }
  

  private baseUrl: string = 'http://localhost:8086/spring2024/Expense/';
  

  
 
  findAllExpense(): Observable<Expense[]>{
    return this.http.get<Expense[]> ( this.baseUrl + 'getAll' )
  }
  sendEmail(email: string, subject: string, corp: string): Observable<any> {
    const request = {
      email: email,
      subject: subject,
      corp: corp
    };
    
    return this.http.post<any>('http://localhost:8086/spring2024/Mail/send-email',request, { responseType: 'text' as 'json' });
  }
 
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:8086/spring2024/Project/getAll');
  }

  addExpense(expense: Expense, projectId: number): Observable<Expense> {
    
    return this.http.post<any>(`${this.baseUrl}add/${projectId}`, expense);
  }
  
  

  updateExpense(expense: Expense) : Observable<Expense> {
   
    return this.http.put<Expense> ( this.baseUrl + 'update', expense);
  }

  deleteExpense(id: number) : Observable<void> {
    return this.http.delete <void> ( this.baseUrl + 'delete/' + id )
  }
  addExpenseAndAffect(idProject: number, expense: Expense): Observable<any> {
    return this.http.post<Expense>(`${this.baseUrl}${idProject}/addAndAffect`, expense);
  }
  tri(){
    return this.http.get<Expense[]>( this.baseUrl + 'tri');

  }

}
