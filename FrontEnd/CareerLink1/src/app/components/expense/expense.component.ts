import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from 'src/app/models/Expense';
import { Project } from 'src/app/models/Project';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {
  constructor(private expenseService: ExpenseService, private fb: FormBuilder) { }
  expenses: Expense[] = [];
  expenseForm!: FormGroup;
  selectedExpense: Expense | null = null;

  ngOnInit(): void {
    this.loadExpenses();
    this.createForm();
    
  }
 
 
  loadExpenses(): void{
    this.expenseService.findAllExpense()
    .subscribe(
      expenses => this.expenses = expenses,
      error => console.error('error, getallExp', error)
    );
  }
  deleteExpense(idexpense :number): void {
    this.expenseService.deleteExpense(idexpense).subscribe(
      response => {
        console.log('success, deleteExpense', response);
        this.loadExpenses();
      },
      error => console.error('error, deleteExpense', error)
    )
  }
  createForm(): void {
    this.expenseForm = this.fb.group({
      
      category: ['', [Validators.required]],
      date: ['', [Validators.required]],
      amount: [null, [Validators.required]], 
      methodPayment: ['', [Validators.required]]
      
    });
  }
  
  addExpense(): void {
    const expense = this.expenseForm.value;
    this.expenseService.addExpense(expense)
    .subscribe(
      response => {
        console.log('success, addExpense', response);
        this.loadExpenses();
      },
      error => console.error('error, addExpense', error)
    );
  }
  cancel():void {
    this.expenseForm.reset();
    }
    editExpense(expense: Expense): void {
      this.selectedExpense = expense;
      this.expenseForm.patchValue({
        amount: expense.amount,
        category: expense.category,
        methodPayment:expense.methodPayment, 
        date: new Date(expense.date),
      
       
      });
    }
    updateExpense(): void {
      if (this.selectedExpense && this.expenseForm.valid) {
        const updatedExpense = { ...this.selectedExpense, ...this.expenseForm.value } as Expense;
        this.expenseService.updateExpense(updatedExpense).subscribe(
          response => {
            console.log('success, updatExpense', response);
            this.loadExpenses();
            this.expenseForm.reset();
            this.selectedExpense=null;
          },
          error => console.error('error, updateExpense', error)
        );
      }
    }
    addExpenseAndAffect(): void {
      const { idProject, idStock, ...expenseData } = this.expenseForm.value;
      this.expenseService.addExpenseAndAffect(idProject, idStock, expenseData)
        .subscribe(
          response => {
            console.log('success, addExpenseAndAffect', response);
            this.loadExpenses();
          },
          error => console.error('error, addExpenseAndAffect', error)
        );
    }
    
    


}
