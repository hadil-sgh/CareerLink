package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.careerlink.entities.TimeOffTracker;
@Repository
public interface TimeOffTrackerRepository extends JpaRepository<TimeOffTracker, Integer> {



}