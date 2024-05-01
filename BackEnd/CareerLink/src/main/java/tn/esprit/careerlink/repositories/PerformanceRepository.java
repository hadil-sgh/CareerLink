package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.careerlink.entities.Performance;
import tn.esprit.careerlink.entities.User;

import java.util.Date;
import java.util.List;

@Repository
public interface PerformanceRepository extends JpaRepository<Performance, Integer> {
    Performance findByWeekAndUserId (int currentWeek,int id);
    @Query("SELECT p FROM Performance p WHERE p.year = :year AND p.week = :month")
    List<Performance> findByYearAndMonth(@Param("year") int year, @Param("month") int month);
    List<Performance> findByUser(User user);
}