import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Expense } from 'src/app/models/Expense';

import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReponseService } from 'src/app/services/reponse.service';

@Component({
  selector: 'app-admrec',
  templateUrl: './admrec.component.html',
  styleUrls: ['./admrec.component.css']
})
export class AdmrecComponent {
  constructor(private reclamationService: ReclamationService,private reponseservice:ReponseService, private fb: FormBuilder) { }
  reclamations: Reclamation[] = [];
 reclamationForm!: FormGroup;
  selectedReclamation: Reclamation | null = null;
  Reponses: Reponse[] = [];
  Expenses: Expense[] = [];
  

  ngOnInit(): void {
    this.loadReclamations();
    this.loadExpenses();
    this.loadReponses();
  }
  loadReclamations(): void{
    this.reclamationService.findAllReclamation()
    .subscribe(
      reclamations => this.reclamations =reclamations,
      error => console.error('error, getallRec', error)
    );
  }
  loadExpenses(): void{
    this.reclamationService.findAllExpense()
    .subscribe(
      Expenses => this. Expenses=  Expenses,
      error => console.error('error, getallExp', error)
    );
  }
  loadReponses(): void {
    this.reponseservice.findAllReponse()
    .subscribe(
      reponses => {
        this.Reponses = reponses;
        console.log('Réponses chargées :', this.Reponses);
      },
      error => console.error('Erreur lors du chargement des réponses :', error)
    );
  }
  
  hasResponse(reclamation: Reclamation): boolean {
    const hasResponse = this.Reponses.some(response => response.reclamation.idreclamation === reclamation.idreclamation);
    console.log('Réclamation', reclamation.idreclamation, 'a une réponse ?', hasResponse);
    return hasResponse;
  }
  
  

}
