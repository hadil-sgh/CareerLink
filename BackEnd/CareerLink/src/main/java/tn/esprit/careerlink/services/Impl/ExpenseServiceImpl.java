package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.repositories.ExpenseRepository;
import tn.esprit.careerlink.services.IExpenseService;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class ExpenseServiceImpl implements IExpenseService {

    @Autowired
    ExpenseRepository expenseRepository;
    @Override
    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public Expense updateExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public void deleteExpense(Integer idexpense) {
        expenseRepository.deleteById(idexpense);
    }

    @Override
    public List<Expense> getAllExpense() {
       return expenseRepository.findAll();
    }

    @Override
    public Expense getExpense(Integer idexpense) {
        return expenseRepository.findById(idexpense).orElse(null);
    }
}
