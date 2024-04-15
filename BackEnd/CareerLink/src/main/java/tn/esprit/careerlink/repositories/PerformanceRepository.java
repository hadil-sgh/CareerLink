package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.careerlink.entities.Performance;

import java.util.Date;

@Repository
public interface PerformanceRepository extends JpaRepository<Performance, Integer> {
    Performance findByWeekAndUserId (int currentWeek,int id);
}