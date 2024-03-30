package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.careerlink.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

}