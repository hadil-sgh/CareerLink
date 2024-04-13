package tn.esprit.careerlink.controllers;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Project;
import tn.esprit.careerlink.services.IExpenseService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/Expense")

public class ExpenseController {
    @Autowired
 IExpenseService expenseService;

    @PutMapping("/update")
    public ResponseEntity<Expense> updateExpense(@RequestBody Expense expense) {
        Expense updatedExpense = expenseService.updateExpense(expense);
        return ResponseEntity.ok(updatedExpense);
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
    @PostMapping("/{idProject}/addAndAffect/{userId}")
    public ResponseEntity<Expense> addExpenseAndAffect(
            @PathVariable Integer idProject,
            @PathVariable Integer userId,
            @RequestBody Expense expense) {

        Expense addedExpense = expenseService.addExpenseAndAffect(idProject, userId, expense);
        return ResponseEntity.ok(addedExpense);
    }


    @GetMapping("/tri")
    List<Expense> tri() {
        return expenseService.tri();
    }
}
