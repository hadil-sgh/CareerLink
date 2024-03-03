package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.services.IExpenseService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Expense")

public class ExpenseController {
    @Autowired
 IExpenseService expenseService;
    @PostMapping("/add")
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }
    @PutMapping("/update")
    public Expense updateExpense(@RequestBody Expense expense){
        return expenseService.updateExpense(expense);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteExpense(@PathVariable ("id")Integer idexpense) {
        expenseService.deleteExpense(idexpense);
    }
    @GetMapping("/getAll")
    public List<Expense> getAllExpense(){
        return expenseService.getAllExpense();
    }
    @GetMapping("/get/{id}")
    public Expense getExpense(@PathVariable ("id") Integer idexpense) {
        return expenseService.getExpense(idexpense);
    }




}
