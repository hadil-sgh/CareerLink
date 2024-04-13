package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Project;

import java.util.List;

public interface IExpenseService {


    Expense updateExpense(Expense expense);
    void deleteExpense (Integer idexpense);
    List<Expense> getAllExpense();
    Expense getExpense (Integer idexpense);
    Expense calculateExpenseAmount(Expense expense);
    Expense addExpenseAndAffect(Integer idProject, Integer userId,Expense expense);

    public List<Expense> tri() ;




}
