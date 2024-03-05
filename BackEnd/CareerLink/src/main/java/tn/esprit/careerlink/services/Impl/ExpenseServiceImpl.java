package tn.esprit.careerlink.services.Impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Project;
import tn.esprit.careerlink.entities.Stock;
import tn.esprit.careerlink.repositories.ExpenseRepository;
import tn.esprit.careerlink.repositories.ProjectRepository;
import tn.esprit.careerlink.repositories.StockRepository;
import tn.esprit.careerlink.services.IExpenseService;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor

public class ExpenseServiceImpl implements IExpenseService {

    @Autowired
    ExpenseRepository expenseRepository;
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    StockRepository stockRepository;



    @Override
    public Expense addExpense(Expense expense)
    {
        return expenseRepository.save(expense);
    }

    @Override
    public Expense addExpenseAndAffect(Integer idProject, Integer idStock, Expense expense) {
        Optional<Project> projectOptional = projectRepository.findById(idProject);
        Optional<Stock> stockOptional = stockRepository.findById(idStock);
        if (projectOptional.isPresent() && stockOptional.isPresent()) {
           Project project = projectOptional.get();
            Stock stock = stockOptional.get();

            expense.setProject(project);
            expense.setStock(stock);
            return  expenseRepository.save(expense);
        }else {
            throw new EntityNotFoundException("project or Stock not found");
        }

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
