package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.careerlink.entities.Reponse;

import java.util.List;

@Repository
public interface ReponseRecRepository extends JpaRepository<Reponse, Integer> {
}