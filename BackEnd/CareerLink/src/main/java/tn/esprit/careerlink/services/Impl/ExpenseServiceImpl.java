package tn.esprit.careerlink.services.Impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Project;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.ExpenseRepository;
import tn.esprit.careerlink.repositories.ProjectRepository;
import tn.esprit.careerlink.repositories.UserRepository;
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
    UserRepository userRepository;










    @Override
    public Expense updateExpense(Expense expense) {

        Optional<Expense> existingExpenseOptional = expenseRepository.findById(expense.getIdexpense());

        if (existingExpenseOptional.isPresent()) {
            Expense existingExpense = existingExpenseOptional.get();
            existingExpense.setAmount(expense.getAmount());
            existingExpense.setDateexpense(expense.getDateexpense());
            existingExpense.setCategory(expense.getCategory());
            existingExpense.setMethodPayment(expense.getMethodPayment());
            existingExpense.setUnitPrice(expense.getUnitPrice());
            existingExpense.setQuantity(expense.getQuantity());
            existingExpense.setStatusPayment((expense.getStatusPayment()));
            return expenseRepository.save(existingExpense);
        } else {
            throw new EntityNotFoundException("Expense not found");
        }
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
    public Expense addExpenseAndAffect(Integer idProject, Integer userId, Expense expense) {

        Optional<Project> projectOptional = projectRepository.findById(idProject);

        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();

            // Récupérer l'utilisateur à partir de son identifiant
            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                expense.setUser(user); // Affecter l'utilisateur à l'expense

                expense.setProject(project);
                return expenseRepository.save(expense);
            } else {
                throw new EntityNotFoundException("User not found with id: " + userId);
            }
        } else {
            throw new EntityNotFoundException("Project not found with id: " + idProject);
        }
    }


    @Override
    public List<Expense> tri() {
        return expenseRepository.findAllByOrderByDateexpense();
    }

}
