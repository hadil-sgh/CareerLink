import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Expense } from 'src/app/models/Expense';

import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-admrec',
  templateUrl: './admrec.component.html',
  styleUrls: ['./admrec.component.css']
})
export class AdmrecComponent {
  constructor(private reclamationService: ReclamationService, private fb: FormBuilder) { }
  reclamations: Reclamation[] = [];
 reclamationForm!: FormGroup;
  selectedReclamation: Reclamation | null = null;
  Reponses: Reponse[] = [];
  Expenses: Expense[] = [];
  

  ngOnInit(): void {
    this.loadReclamations();
    this.loadExpenses();
    
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

}
