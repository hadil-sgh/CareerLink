import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/Reclamation';
import { Project } from '../models/Project';
import { Expense } from '../models/Expense';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private baseUrl: string = 'http://localhost:8086/spring2024/Reclamation/';

  constructor(private http :HttpClient) {  }
  findAllReclamation(): Observable<Reclamation[]>{
    return this.http.get<Reclamation[]> ( this.baseUrl + 'getAll' )
  }
  addReclamationAndAffect(idexpense: number, reclamation: Reclamation): Observable<any> {
    return this.http.post<Reclamation>(`${this.baseUrl}${idexpense}/addAndAffect`, reclamation);
  }
  
  addReclamation(reclamation:Reclamation) : Observable<Reclamation> {
    return this.http.post<Reclamation> ( this.baseUrl + 'add', reclamation );
  }

  updateReclamation(reclamation:Reclamation) : Observable<Reclamation> {
    return this.http.put<Reclamation> ( this.baseUrl + 'update', reclamation);
  }

  deleteReclamation(id: number) : Observable<void> {
    return this.http.delete <void> ( this.baseUrl + 'delete/' + id )
  }
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:8086/spring2024/Project/getAll');
  }
  findAllExpense(): Observable<Expense[]>{
    return this.http.get<Expense[]> ('http://localhost:8086/spring2024/Expense/getAll' );
  }
}
