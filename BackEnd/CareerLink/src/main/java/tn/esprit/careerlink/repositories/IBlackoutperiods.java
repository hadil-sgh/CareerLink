package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.careerlink.entities.Blackoutperiods;

@Repository
public interface IBlackoutperiods extends JpaRepository<Blackoutperiods, Integer> {
}
