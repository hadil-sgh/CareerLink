package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.careerlink.entities.TimeOffTracker;

import java.util.Date;
import java.util.List;

@Repository
public interface TimeOffTrackerRepository extends JpaRepository<TimeOffTracker, Integer> {
    @Query("SELECT t FROM TimeOffTracker t WHERE t.fromDate >= :startDate AND t.toDate <= :endDate")
    List<TimeOffTracker> findByDateRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate);


}