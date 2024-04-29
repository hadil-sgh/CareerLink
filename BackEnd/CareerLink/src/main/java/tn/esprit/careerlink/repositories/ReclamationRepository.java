package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Reclamation;
import tn.esprit.careerlink.entities.TypeReclamation;

import java.util.List;

@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation, Integer> {
    List<Reclamation> findAllByOrderByDatereclamation();
    List<Reclamation> findByTypeReclamation(TypeReclamation type);

}