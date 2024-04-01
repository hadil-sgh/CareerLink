import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Expense } from 'src/app/models/Expense';
import { Project } from 'src/app/models/Project';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { MethodPayment } from 'src/app/models/methodPayment';
import { ExpenseService } from 'src/app/services/expense.service';
import { ReclamationService } from 'src/app/services/reclamation.service';



@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent {
  constructor(private reclamationService: ReclamationService,private expenseService:ExpenseService, private route: ActivatedRoute, private fb: FormBuilder) { }
  reclamations: Reclamation[] = [];
 reclamationForm!: FormGroup;
  selectedReclamation: Reclamation | null = null;
  Reponses: Reponse[] = [];
  expenses:Expense[] = [];
  selectedExpense: Expense | null = null; 
  idexpense: number | undefined;
  ngOnInit(): void {
    
    this.loadReclamations();
    this.createForm();
    this.loadExpenses();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
          this.idexpense = parseInt(id, 10); // Assurez-vous que l'ID est bien récupéré sous forme de nombre
          this.reclamationForm.patchValue({ idexpense: this.idexpense }); // Mettre à jour le champ du formulaire avec l'ID récupéré
      } else {
          // Gérer le cas où l'ID n'est pas trouvé dans les paramètres de l'URL
      }
  });
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
  createForm(): void {
    this.reclamationForm = this.fb.group({
      

      datereclamation: ['', [Validators.required]],
      description: [null, [Validators.required]], 
     
      typeReclamation: ['', [Validators.required]],
      idexpense: ['', [Validators.required]]


      
      
    });
  }
  addReclamationAndAffect(): void {
    const { datereclamation, description, typeReclamation, idexpense } = this.reclamationForm.value;
  
    const newReclamation: Reclamation = {
      idreclamation: 0, // Assurez-vous d'attribuer l'id de la réclamation, ou la valeur appropriée si elle est générée automatiquement
      datereclamation: datereclamation,
      description: description,
       // Assurez-vous d'attribuer une valeur appropriée pour statuReclamation
      typeReclamation: typeReclamation,
      reponse: [], // Initialisez la liste de réponses à vide
      expense: { idexpense: idexpense, unitPrice: 0, quantity: 0, amount: 0, dateexpense: new Date(), category: '', methodPayment: MethodPayment.CARD,  project: { idProject: 0, name: '', description: '', dueDate: new Date(), price: 0, teams: [], tasks: [], expense: [] ,},reclamation: [] ,}

    };
  
    this.reclamationService.addReclamationAndAffect(idexpense, newReclamation)
      .subscribe(
        () => {
          console.log('success, addReclamationAndAffect');
          this.loadReclamations();
          this.reclamationForm.reset();
        },
        error => console.error('error, addReclamationAndAffect', error)
      );
}


  cancel():void {
    this.reclamationForm.reset();
    }
    editReclamation(reclamation: Reclamation): void {
      this.selectedReclamation = reclamation;
      this.reclamationForm.patchValue({
        description: reclamation.description,
       
        typeReclamation:reclamation.typeReclamation,
       
        datereclamation: new Date(reclamation.datereclamation)

      });
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
