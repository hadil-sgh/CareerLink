import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  showAddReclamationForm = true;

  constructor() { }

  toggleAddReclamationForm(): void {
    this.showAddReclamationForm = !this.showAddReclamationForm;
  }
}
