package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Stock;
import tn.esprit.careerlink.services.IExpenseService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/Expense")

public class ExpenseController {
    @Autowired
 IExpenseService expenseService;
    @PostMapping("/add")
    public Expense addStock(@RequestBody Expense expense) {
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
    @PostMapping("/addAndAffect/{idProject}/{idStock}")
    public ResponseEntity<Expense> addExpenseAndAffect(@PathVariable("idProject") Integer idProject, @PathVariable("idStock") Integer idStock, @RequestBody Expense expense) {
        Expense addExpenseAndAffect =expenseService.addExpenseAndAffect(idProject, idStock, expense);
        return ResponseEntity.ok(addExpenseAndAffect);
    }





}
