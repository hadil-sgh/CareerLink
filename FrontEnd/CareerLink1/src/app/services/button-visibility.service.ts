import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonVisibilityService {

  private showButtonsSubject = new BehaviorSubject<boolean>(true);
  showButtons$ = this.showButtonsSubject.asObservable();
  
  constructor() {
    // Récupérer l'état des boutons depuis localStorage lors de l'initialisation du service
    const storedState = localStorage.getItem('hideEditDeleteButtons');
    if (storedState !== null) {
      this.showButtonsSubject.next(!JSON.parse(storedState)); // Inverser la valeur stockée
    }
  }
  
  updateButtonVisibility(show: boolean): void {
    this.showButtonsSubject.next(show);
    // Mettre à jour localStorage avec le nouvel état des boutons
    localStorage.setItem('hideEditDeleteButtons', JSON.stringify(!show)); // Inverser la valeur pour le stockage
  }
}
