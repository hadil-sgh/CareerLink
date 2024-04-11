import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from 'src/app/models/Expense';
import { Project } from 'src/app/models/Project';
import { ExpenseService } from 'src/app/services/expense.service';
import { combineLatest } from 'rxjs';
import { DatePipe } from '@angular/common';
import { StatusPayment } from 'src/app/models/statuspayment';




@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {
  search: string = '';
  filteredExpenses: Expense[] = [];

  constructor(private expenseService: ExpenseService, private datePipe: DatePipe, private fb: FormBuilder) { }
  expenses: Expense[] = [];
  expenseForm!: FormGroup;
  selectedExpense: Expense | null = null;
  projects: Project[] = [];
  email= 'aziz.abidi@esprit.tn'; 
  subject= 'Confirmation de votre payement'; 
  corp= 'Cher Utilisateur,votre payement a ete effectue avec succes '; 

  ngOnInit(): void {
    this.loadExpenses();
    this.loadProjects(); // Chargez les projets au démarrage du composant
    this.createForm();
  }
  
  loadProjects(): void {
    this.expenseService.getAllProjects()
      .subscribe(
        projects => this.projects = projects,
        error => console.error('error, getAllProjects', error)
      );
  }
  
  loadExpenses(): void {
    this.filteredExpenses = this.expenses;
    this.expenseService.findAllExpense()
      .subscribe(
        expenses => this.expenses = expenses,
        error => console.error('error, getallExp', error)
      );
  }

  deleteExpense(idexpense: number): void {
    this.expenseService.deleteExpense(idexpense).subscribe(
      response => {
        console.log('success, deleteExpense', response);
        // Afficher une alerte en cas de succès
        alert('Expense deleted successfully.');
        this.loadExpenses();
      },
      error => {
        console.error('error, deleteExpense', error);
        // Afficher une alerte en cas d'échec
        alert('Failed to delete expense. you cant removed ');
      }
    )
}


  createForm(): void {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.expenseForm = this.fb.group({
      category: ['', [Validators.required]],
      dateexpense: [formattedDate, [Validators.required]],
      methodPayment: ['', [Validators.required]],
      unitPrice: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      projectId: ['', [Validators.required]],
      statusPayment: ['NONPAYE', [Validators.required]]   // Modifier le type de projectId en string
     
    });


    // Observer les changements dans les champs quantity et unitPrice
    combineLatest([
      this.expenseForm.get('quantity')!.valueChanges,
      this.expenseForm.get('unitPrice')!.valueChanges
    ]).subscribe(([quantity, unitPrice]) => {
      // Calculer le montant (amount) en multipliant la quantité par le prix unitaire
      const amount = (quantity && unitPrice) ? (quantity * unitPrice) : null;
      // Mettre à jour la valeur du champ amount dans le formulaire
      this.expenseForm.get('amount')!.patchValue(amount, { emitEvent: false });
    });
  }

  addExpenseAndAffect(): void {
    const { category, dateexpense, methodPayment, unitPrice, quantity, amount, projectId,qrCodeData,qrCodeImageUrl,statusPayment } = this.expenseForm.value;
  
    const expense: Expense = {
      idexpense: 0, // Définir l'idexpense, ou la valeur appropriée si elle est générée automatiquement
      category: category,
      dateexpense: dateexpense,
      methodPayment: methodPayment,
      unitPrice: unitPrice,
      quantity: quantity,
      amount: amount,
      qrCodeData:  qrCodeData,
        qrCodeImageUrl: qrCodeImageUrl,
        statusPayment:statusPayment ,
      // Définir la réclamation si nécessaire, sinon null
      project: { idProject: projectId, name: '', description: '', dueDate: new Date(), price: 0, teams: [], tasks: [], expense: [] ,},
      reclamation:[]
    };
  
    this.expenseService.addExpenseAndAffect(projectId, expense) // Utilisez la fonction addExpenseAndAffect() du service
      .subscribe(
        () => {
          console.log('success, addExpenseAndAffect');
          alert('expense added successfully');
          this.loadExpenses();
          this.expenseForm.reset();
        },
        error => console.error('error, addExpenseAndAffect', error)
      );
  }
  


  

  cancel(): void {
    this.expenseForm.reset();
  }

  editExpense(expense: Expense): void {
    this.selectedExpense = expense;
    const currentDate = new Date(); // Obtenir la date actuelle
    this.expenseForm.patchValue({
      category: expense.category,
      unitPrice: expense.unitPrice,
      quantity: expense.quantity,
      methodPayment: expense.methodPayment,
      dateexpense:currentDate.toISOString().split('T')[0], 
      statusPayment:expense.statusPayment,
      amount: expense.amount
    });
    if (this.selectedExpense) {
      this.expenseForm.get('projectId')!.disable(); // Désactiver le champ projectId
    } else {
      this.expenseForm.get('projectId')!.enable(); // Activer le champ projectId
    }
    this.expenseForm.get('statusPayment')!.disable();
  }
  

  updateExpense(): void {
    if (this.selectedExpense && this.expenseForm.valid) {
      const updatedExpense = { ...this.selectedExpense, ...this.expenseForm.value } as Expense;
      this.expenseService.updateExpense(updatedExpense)
        .subscribe(
          response => {
            console.log('success, updateExpense', response);
            alert('expense updated successfully');
            this.loadExpenses();
            this.expenseForm.reset();
            this.selectedExpense = null;
          },
          error => console.error('error, updateExpense', error)
        );
    }
  }
  tri(){
    this.expenseService.tri().subscribe(expense => {
      this.expenses = expense;
      console.log('tri success');
    },
    (error) => {
      // Gestion des erreurs : Affichez ou traitez les erreurs ici
      console.error('Erreur lors de l\'enregistrement de la réponse : ', error);
    }
  );
  }
  searchExpenses(): void {
    this.filteredExpenses = this.expenses.filter(expense => 
      expense.category.toLowerCase().includes(this.search.toLowerCase())
    );
  }
  payExpense(expense: Expense): void {
    if (expense.statusPayment === 'PAYE') {
      alert("Le paiement a déjà été effectué.");
    } else {
      // Mettre à jour le statut de paiement en "PAYE"
      expense.statusPayment = StatusPayment.PAYE;

      // Appeler le service pour mettre à jour l'expense dans la base de données
      this.expenseService.updateExpense(expense).subscribe(
        updatedExpense => {
          console.log('Statut de paiement mis à jour avec succès :', updatedExpense);
          alert("Statut de paiement mis à jour avec succès.");
          this.sendEmail();
        },
        error => {
          console.error('Erreur lors de la mise à jour du statut de paiement :', error);
          alert("Erreur lors de la mise à jour du statut de paiement.");
        }
      );
    }
  }
  sendEmail() {
    
  
     
      
    this.expenseService.sendEmail(this.email, this.subject, this.corp).subscribe(
      response => {
        console.log('Email envoyé avec succès :', response);
        // Traitez la réponse de l'API
      },
      error => {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        // Gérez l'erreur
      }
    );
  }
  
}
