package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.careerlink.entities.Task;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface TaskRepository  extends JpaRepository<Task,Integer> {
    List<Task> findByUserIdAndDueDateBetween(Long userId, Date startDate, Date endDate);

}


