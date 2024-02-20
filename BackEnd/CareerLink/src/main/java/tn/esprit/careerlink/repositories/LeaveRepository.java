package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.careerlink.entities.Leave;

public interface LeaveRepository extends JpaRepository<Leave, Integer> {
}