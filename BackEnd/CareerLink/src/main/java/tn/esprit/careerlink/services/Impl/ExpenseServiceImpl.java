package tn.esprit.careerlink.services.Impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Project;
import tn.esprit.careerlink.repositories.ExpenseRepository;
import tn.esprit.careerlink.repositories.ProjectRepository;
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





    @Override
    public Expense addExpense(Expense expense, Integer idProject)
    { expense =calculateExpenseAmount(expense);
        Integer projectId = expense.getProject().getIdProject();
        return expenseRepository.save(expense);
    }





    @Override
    public Expense updateExpense(Expense expense,Integer idProject) {
        Integer projectId = expense.getProject().getIdProject();
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

    @Override
    public Expense calculateExpenseAmount(Expense expense) {
        expense.setAmount(expense.getUnitPrice() * expense.getQuantity());

        return expense;
    }
    @Override
    public Expense addExpenseAndAffect(Integer idProject, Expense expense) {
        Optional<Project> projectOptional = projectRepository.findById(idProject);

        if (projectOptional.isPresent() ) {
            Project project = projectOptional.get();


            expense.setProject(project);

            return  expenseRepository.save(expense);
        }else {
            throw new EntityNotFoundException("project not found");
        }

    }

    @Override
    public List<Expense> tri() {
        return expenseRepository.findAllByOrderByDateexpense();
    }

}
