package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.careerlink.entities.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {
}