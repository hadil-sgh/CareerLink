package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import tn.esprit.careerlink.entities.Team;
import tn.esprit.careerlink.repositories.TeamRepository;
import tn.esprit.careerlink.services.ITeamService;

import java.util.List;

@Service
@AllArgsConstructor
public class TeamServiceImpl implements ITeamService {
    final TeamRepository teamRepository;

    public Team addTeam(Team team) {
        return teamRepository.save(team);
    }


    public Team updateTeam(Team team) {
        return teamRepository.save(team);
    }


    public Team getOneTeam(Integer id) {
        return teamRepository.findById(id).orElse(null);
    }


    public List<Team> getAllTeam() {
        return teamRepository.findAll();
    }


    public void deleteTeam(Integer id) {
        teamRepository.deleteById(id);
    }
}


