package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Expense;

import java.util.List;

public interface IExpenseService {
    Expense addExpense (Expense expense);
    Expense updateExpense (Expense expense);
    void deleteExpense (Integer idexpense);
    List<Expense> getAllExpense();
    Expense getExpense (Integer idexpense);
}
