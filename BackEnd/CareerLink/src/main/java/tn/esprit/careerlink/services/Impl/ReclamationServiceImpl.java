package tn.esprit.careerlink.services.Impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Project;
import tn.esprit.careerlink.entities.Reclamation;
import tn.esprit.careerlink.entities.Reponse;
import tn.esprit.careerlink.repositories.ExpenseRepository;
import tn.esprit.careerlink.repositories.ReclamationRepository;
import tn.esprit.careerlink.services.IReclamationService;
import tn.esprit.careerlink.services.IRecruitmentService;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor

public class ReclamationServiceImpl implements IReclamationService {
    @Autowired
    ReclamationRepository reclamationRepository;
    @Autowired
    ExpenseRepository expenseRepository;

    @Override
    public Reclamation addReclamation(Reclamation reclamation) {
        return reclamationRepository.save(reclamation);
    }

    @Override
    public Reclamation updateReclamation(Reclamation reclamation) {
        Optional<Reclamation> existingReclamationOptional = reclamationRepository.findById(reclamation.getIdreclamation());

        if (existingReclamationOptional.isPresent()) {
            Reclamation existingReclamation = existingReclamationOptional.get();
            existingReclamation.setDatereclamation(reclamation.getDatereclamation());
            existingReclamation.setDescription(reclamation.getDescription());
            existingReclamation.setTypeReclamation(reclamation.getTypeReclamation());

            return  reclamationRepository.save(existingReclamation);
        } else {
            throw new EntityNotFoundException("reclamation not found");
        }
    }

    @Override
    public void deleteReclamation(Integer idreclamation) {
        reclamationRepository.deleteById(idreclamation);

    }

    @Override
    public List<Reclamation> getAllReclamation() {
        return reclamationRepository.findAll();
    }

    @Override
    public Reclamation getReclamation(Integer idreclamation) {
        return reclamationRepository.findById(idreclamation).orElse(null);
    }

    @Override
    public Reclamation addReclamationAndAffect(Integer idexpense, Reclamation reclamation) {

        Optional<Expense> expenseOptional = expenseRepository.findById(idexpense);

        if (expenseOptional.isPresent() ) {
            Expense expense = expenseOptional.get();


            reclamation.setExpense(expense);

            return  reclamationRepository.save(reclamation);
        }else {
            throw new EntityNotFoundException("expense not found");
        }

    }

    @Override
    public List<Reclamation> tri() {
        return reclamationRepository.findAllByOrderByDatereclamation();
    }

}
