package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    @PostMapping("/add/{idProject}")
    public Expense addExpense(@RequestBody Expense expense, @PathVariable("idProject") Integer idProject) {
        // Créez un objet Project avec seulement l'ID pour l'associer à l'Expense
        Project project = new Project();
        project.setIdProject(idProject);
        expense.setProject(project);
        return expenseService.addExpense(expense,idProject);
    }

    @PutMapping("/update/{idProject}")
    public Expense updateExpense(@RequestBody Expense expense, @PathVariable("idProject") Integer idProject){
        // Créez un objet Project avec seulement l'ID pour l'associer à l'Expense
        Project project = new Project();
        project.setIdProject(idProject);
        expense.setProject(project);
        return expenseService.updateExpense(expense,idProject);
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
    @PostMapping("/{idProject}/addAndAffect")
    public ResponseEntity<Expense> addExpenseAndAffect(@PathVariable Integer idProject,  @RequestBody Expense expense) {
        Expense addExpenseAndAffect =expenseService.addExpenseAndAffect(idProject,expense);
        return ResponseEntity.ok(addExpenseAndAffect);
    }


    @GetMapping("/tri")
    List<Expense> tri() {
        return expenseService.tri();
    }
}
