package tn.esprit.careerlink.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.careerlink.entities.Team;
import tn.esprit.careerlink.entities.User;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team,Integer>{
    List<Team> findByUsers(User user);

}

