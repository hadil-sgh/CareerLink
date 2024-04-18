import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationServiceService {

  private confirmationSubject = new BehaviorSubject<boolean>(false);

  setConfirmation(value: boolean): void {
    this.confirmationSubject.next(value);
  }

  getConfirmation(): Observable<boolean> {
    return this.confirmationSubject.asObservable();
  }
}
