package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.careerlink.entities.Daysoffbyrole;

@Repository
public interface IDaysoffbyrole extends JpaRepository<Daysoffbyrole, Integer> {
}
