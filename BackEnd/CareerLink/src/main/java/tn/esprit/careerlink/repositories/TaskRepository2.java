package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.careerlink.entities.Task;

import java.util.Date;
import java.util.List;

public interface TaskRepository2 extends JpaRepository<Task,Integer> {
    List<Task> findByUserIdAndDueDateBetween(Long userId, Date startDate, Date endDate);

}


