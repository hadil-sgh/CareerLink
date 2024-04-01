import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/models/Expense';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { MethodPayment } from 'src/app/models/methodPayment';
import { ExpenseService } from 'src/app/services/expense.service';
import { ReclamationService } from 'src/app/services/reclamation.service';


@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent {

  constructor(private reclamationService: ReclamationService,private expenseService:ExpenseService, private route: ActivatedRoute,private router: Router, private fb: FormBuilder) { }
  reclamations: Reclamation[] = [];
 reclamationForm!: FormGroup;
  selectedReclamation: Reclamation | null = null;
  Reponses: Reponse[] = [];
  expenses:Expense[] = [];
  selectedExpense: Expense | null = null; 
  idexpense: number | undefined; 
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        // Chargez les données de la réclamation correspondante avec cet ID ici
        // Vous pouvez appeler une méthode pour charger les données de la réclamation en fonction de cet ID
      } else {
        // Gérer le cas où l'ID n'est pas trouvé dans les paramètres de l'URL
      }
    });
    
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
    this.expenseService.findAllExpense()
    .subscribe(
      expenses => this.expenses =expenses,
      error => console.error('error, getallExp', error)
    );
  }
  deleteReclamation(idreclamation :number): void {
    this.reclamationService.deleteReclamation(idreclamation).subscribe(
      response => {
        console.log('success, deleteReclamation', response);
        this.loadReclamations();
      },
      error => console.error('error, deleteReclamation', error)
    )
  }
  editReclamation(reclamation: Reclamation): void {
    this.selectedReclamation = reclamation;
    this.reclamationForm.patchValue({
        description: reclamation.description,
        typeReclamation: reclamation.typeReclamation,
        datereclamation: new Date(reclamation.datereclamation)
    });
    this.router.navigate(['/Employee/reclamation', reclamation.datereclamation]);
    this.reclamationForm.get('idexpense')!.disable();
}
  updateReclamation(): void {
    if (this.selectedReclamation && this.reclamationForm.valid) {
      const updatedReclamation = { ...this.selectedReclamation, ...this.reclamationForm.value } as Reclamation;
      this.reclamationService.updateReclamation(updatedReclamation).subscribe(
        response => {
          console.log('success, updatReclamation', response);
          this.loadReclamations();
          this.reclamationForm.reset();
          this.selectedReclamation=null;
          
        },
        error => console.error('error, updateReclamation', error)
      );
    }
  }
 
}
