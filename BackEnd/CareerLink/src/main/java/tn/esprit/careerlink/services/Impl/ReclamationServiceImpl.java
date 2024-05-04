package tn.esprit.careerlink.services.Impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.*;
import tn.esprit.careerlink.repositories.ExpenseRepository;
import tn.esprit.careerlink.repositories.ReclamationRepository;
import tn.esprit.careerlink.services.IReclamationService;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

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

    @Override
    public List<Reclamation> getReclamationsByType(TypeReclamation type) {
        return reclamationRepository.findByTypeReclamation(type);
    }

    @Override
    public List<Reclamation> classerReclamationsParImportance() {
        List<Reclamation> reclamations = reclamationRepository.findAll();

        // Calculer l'importance de chaque réclamation
        for (Reclamation reclamation : reclamations) {
            reclamation.setDescriptionLength(reclamation.getDescription().length());
            // Calculer l'importance en utilisant une méthode dédiée
            int keywordsPresence = calculerKeywordsPresence(reclamation.getDescription());
            reclamation.setImportance(calculerImportance(reclamation,keywordsPresence));
        }

        // Trier les réclamations par ordre d'importance décroissante
        Collections.sort(reclamations, Comparator.comparing(Reclamation::getImportance).reversed());

        return reclamations;
    }

    @Override
    public boolean reclamationEstRepondue(Reclamation reclamation) {
        return reclamation.getReponse()!= null;
    }


    @Override
    public List<Reclamation> obtenirReclamationsNonReponduesDepuisDeuxJours() {
        List<Reclamation> reclamationsNonRepondues = new ArrayList<>();
        LocalDate deuxJoursAvant = LocalDate.now().minusDays(2);

        List<Reclamation> reclamations = reclamationRepository.findAll();

        for (Reclamation reclamation : reclamations) {
            if (!reclamationEstRepondue(reclamation)) {
                LocalDate dateCreation = reclamation.getDatereclamation();
                long joursDepuisCreation = ChronoUnit.DAYS.between(dateCreation, LocalDate.now());
                if (joursDepuisCreation == 2) {
                    reclamationsNonRepondues.add(reclamation);
                }
            }
        }

        return reclamationsNonRepondues;
    }

    private double calculerImportance(Reclamation reclamation, int keywordsPresence) {
        // Exemple de calcul d'importance basé sur différents critères

        int gravite = reclamation.getGravite(); // Exemple : niveau de gravité de la réclamation (sur une échelle de 1 à 5)
        double impactClient = reclamation.getImpactClient(); // Exemple : niveau d'impact sur les clients (sur une échelle de 1 à 5)
        int recurrence = reclamation.getRecurrence(); // Exemple : fréquence de récurrence du problème (sur une échelle de 1 à 5)
        int descriptionLength = reclamation.getDescriptionLength();
        // Calcul de l'importance en combinant les différents critères
        return  gravite * 0.4 + impactClient * 0.3 + recurrence * 0.3 + descriptionLength * 0.2 + keywordsPresence * 0.1;
    }
    private int calculerKeywordsPresence(String description) {
        // Exemple de calcul de la présence de mots clés

        // Comptez le nombre de mots clés importants dans la description
        int count = 0;
        if (description.toLowerCase().contains("urgent")) {
            count += 3; // Pondération spécifique pour le mot clé "urgent"
        }
        if (description.toLowerCase().contains("problème")) {
            count += 2; // Pondération spécifique pour le mot clé "problème"
        }
        // Ajoutez d'autres mots clés et pondérations selon vos besoins
        if (description.toLowerCase().contains("grave")) {
            count += 2; // Pondération spécifique pour le mot clé "grave"
        }
        if (description.toLowerCase().contains("important")) {
            count += 1; // Pondération spécifique pour le mot clé "important"
        }
        return count;
    }

}
