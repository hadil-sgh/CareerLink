import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Expense } from 'src/app/models/Expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent {
  constructor(private expenseService: ExpenseService, private fb: FormBuilder) { }
  expenses: Expense[] = [];
  expenseForm!: FormGroup;
  selectedExpense: Expense | null = null;

  ngOnInit(): void {
    this.loadExpenses();
   
    
  }
 
 
  loadExpenses(): void{
    this.expenseService.findAllExpense()
    .subscribe(
      expenses => this.expenses = expenses,
      error => console.error('error, getallExp', error)
    );
  }

}
