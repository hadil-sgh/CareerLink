package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.careerlink.entities.Client;

public interface ClientRepository extends JpaRepository<Client, Integer> {
}