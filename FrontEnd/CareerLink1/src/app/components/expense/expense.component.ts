import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from 'src/app/models/Expense';
import { Project } from 'src/app/models/Project';
import { ExpenseService } from 'src/app/services/expense.service';
import { combineLatest } from 'rxjs';
import { DatePipe } from '@angular/common';
import { StatusPayment } from 'src/app/models/statuspayment';
import { Role } from 'src/app/models/Role';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';




@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {
  search: string = '';
  filteredExpenses: Expense[] = [];

  constructor(private expenseService: ExpenseService, private datePipe: DatePipe,private userservice: UserService, private fb: FormBuilder) { }
  expenses: Expense[] = [];
  expenseForm!: FormGroup;
  selectedExpense: Expense | null = null;
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  users: User[] = [];
  email = '';
  subject = "Confirmation de paiement réussi";
corp = "Cher Utilisateur,\n\nNous sommes ravis de vous informer que votre paiement a été effectué avec succès. Nous vous remercions pour votre transaction.\n\nCordialement,\nL'équipe de CareerLink";

  ngOnInit(): void {
    this.loadExpenses();
    this.loadProjects(); // Chargez les projets au démarrage du composant
    this.createForm();
    this.loadUsers();
  }
  loadUsers(): void {
    this.userservice.findAllUsers()
      .subscribe(
        users => {
          this.users = users;
          console.log('Utilisateurs chargés avec succès :', users);
        },
        error => console.error('Erreur lors du chargement des utilisateurs :', error)
      );
  }
  
  loadProjects(): void {
    this.expenseService.getAllProjects()
      .subscribe(
        projects => {
          this.projects = projects;
          this.filteredProjects = projects; // Copiez tous les projets dans filteredProjects
        },
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
  this.expenseForm = this.fb.group({
    userId: ['', [Validators.required]],
    dateexpense: [new Date().toISOString().split('T')[0], [Validators.required]],
   
    amount: ['', [Validators.required]],
    category: ['', [Validators.required]],
    methodPayment: ['CASH', [Validators.required]],
    projectId: ['', [Validators.required]],
    statusPayment: ['NONPAYE', [Validators.required]]
  });

  
  
    // Observer les changements dans les champs quantity et unitPrice
   
  }

  addExpenseAndAffect(): void {
    const { category, dateexpense, methodPayment, unitPrice, quantity, amount, projectId,userId,statusPayment } = this.expenseForm.value;
  
    const expense: Expense = {
      idexpense: 0, // Définir l'idexpense, ou la valeur appropriée si elle est générée automatiquement
      category: category,
      dateexpense: dateexpense,
      methodPayment: methodPayment,
      unitPrice: unitPrice,
      quantity: quantity,
      amount: amount,
      
        statusPayment:statusPayment ,
        user: {
          id: userId,
          firstName: 'John',
          lastName: 'Doe',
          cin: 1234567890,
          phoneNumber: 123456789,
          address: '123 Main St',
          birthday: new Date('1990-01-01'),
          recdate: new Date(),
          role: Role.Consultant, // Par exemple, définissez le rôle de l'utilisateur
          email: 'john.doe@example.com',
          expense: [] // Laissez vide ou mettez à jour avec les dépenses de l'utilisateur si nécessaire
        },
      // Définir la réclamation si nécessaire, sinon null
      project: { idProject: projectId, name: '', description: '', dueDate: new Date(), price: 0, teams: [], tasks: [], expense: [],},
      reclamation:[]
    };
  
    this.expenseService.addExpenseAndAffect(projectId, userId,expense) // Utilisez la fonction addExpenseAndAffect() du service
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
    this.expenseForm.get('userId')!.disable();
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
          const associatedUser = this.users.find(user => user.id === expense.user.id);
          if (associatedUser) {
            const userName = associatedUser.firstName;
  
            // Récupérer le montant payé
            const amountPaid = expense.amount;

            // Modifier le corps de l'e-mail pour inclure le nom de l'utilisateur et le montant payé
            const emailBody = `Cher ${userName},\n\nNous sommes ravis de vous informer que votre paiement de ${amountPaid}DT a été effectué avec succès. Nous vous remercions.\n\nCordialement,\nL'équipe de CareerLink`;

            // Envoyer l'e-mail avec le nouveau corps
            this.sendEmail(associatedUser.email, this.subject, emailBody);
            alert("paiment reussit et un email sera envoyer au utlisateur  .");
          } else {
            console.error('Utilisateur associé non trouvé pour l\'expense :', expense);
          }
        },
        error => {
          console.error('Erreur lors de la mise à jour du statut de paiement :', error);
          alert("Erreur lors de la mise à jour du statut de paiement.");
        }
      );
    }
  }
  
  sendEmail(userEmail: string, subject: string, body: string): void {
    this.expenseService.sendEmail(userEmail, subject, body).subscribe(
      response => {
        console.log('Email envoyé avec succès :', response);
      },
      error => {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
      }
    );
  }
  
}
