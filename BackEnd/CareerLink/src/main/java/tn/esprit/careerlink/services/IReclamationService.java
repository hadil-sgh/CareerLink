package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Reclamation;

import java.util.List;

public interface IReclamationService {
    Reclamation addReclamation (Reclamation reclamation);
    Reclamation updateReclamation(Reclamation reclamation);
    void deleteReclamation (Integer idreclamation);
    List<Reclamation> getAllReclamation();
    Reclamation getReclamation (Integer idreclamation);
}
