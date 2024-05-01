package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.careerlink.entities.Performance;
import tn.esprit.careerlink.entities.User;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.Optional;

@Repository
public interface PerformanceRepository extends JpaRepository<Performance, Integer> {
    Performance findByWeekAndUserId (int currentWeek,int id);
    @Query("SELECT p FROM Performance p WHERE p.year = :year AND p.week = :month")
    List<Performance> findByYearAndMonth(@Param("year") int year, @Param("month") int month);
    List<Performance> findByUser(User user);
    @Query("SELECT p FROM Performance p WHERE p.week = ?1 AND p.year = ?2 ORDER BY p.grade DESC")
    List<Performance> findByMonthAndYear(int month, int year);
    List<Performance> findByYear(int year);
}



