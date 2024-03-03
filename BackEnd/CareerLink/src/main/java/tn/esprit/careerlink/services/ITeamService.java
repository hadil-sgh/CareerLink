package tn.esprit.careerlink.services;


import tn.esprit.careerlink.entities.Team;

import java.util.List;

public interface ITeamService {
    Team addTeam(Team team);

    Team updateTeam(Team team);

    Team getOneTeam(Integer id);

    List<Team> getAllTeam();

    void deleteTeam(Integer id);
}
