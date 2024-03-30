package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.careerlink.entities.Reclamation;
@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation, Integer> {
}