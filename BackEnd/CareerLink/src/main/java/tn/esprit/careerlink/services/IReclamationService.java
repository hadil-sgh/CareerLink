package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Reclamation;
import tn.esprit.careerlink.entities.TypeReclamation;

import java.util.List;

public interface IReclamationService {
    Reclamation addReclamation (Reclamation reclamation);
    Reclamation updateReclamation(Reclamation reclamation);
    void deleteReclamation (Integer idreclamation);
    List<Reclamation> getAllReclamation();
    Reclamation getReclamation (Integer idreclamation);
    Reclamation addReclamationAndAffect(Integer idexpense, Reclamation reclamation);
    public List<Reclamation> tri() ;
    public List<Reclamation> getReclamationsByType(TypeReclamation type);



    public List<Reclamation> classerReclamationsParImportance();

    public boolean reclamationEstRepondue(Reclamation reclamation);
    public List<Reclamation> obtenirReclamationsNonReponduesDepuisDeuxJours();
}
