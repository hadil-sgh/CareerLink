import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/models/Expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { StripeComponent } from '../stripe/stripe.component'; // Importez le composant StripeComponent
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {
  expenses: Expense[] = [];
  expenseForm!: FormGroup;
  selectedExpense: Expense | null = null;
  stripeComponent: StripeComponent; // Déclarez une variable pour contenir l'instance du composant StripeComponent
  projects: Project[] = [];

  constructor(
    private expenseService: ExpenseService, 
    private fb: FormBuilder,
    private ac: ActivatedRoute,
    private router: Router,
    private http: HttpClient // Injectez HttpClient
    
  ) {
    this.stripeComponent = new StripeComponent(http, ac, router); // Créez une instance de StripeComponent avec les dépendances
  }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadProjects();
  }

  loadExpenses(): void {
    this.expenseService.findAllExpense()
      .subscribe(
        expenses => this.expenses = expenses,
        error => console.error('error, getallExp', error)
      );
  }
  loadProjects(): void {
    this.expenseService.getAllProjects()
      .subscribe(
        projects => this.projects = projects,
        error => console.error('error, getAllProjects', error)
      );
  }

  payExpense(expense: Expense): void {
    this.stripeComponent.amount = expense.amount; // Définissez le montant dans StripeComponent
    this.stripeComponent.pay(); // Appelez la méthode pay() de StripeComponent pour effectuer le paiement
  }
}
