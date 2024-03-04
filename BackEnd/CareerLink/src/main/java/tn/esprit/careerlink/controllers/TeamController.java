package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import tn.esprit.careerlink.entities.Team;
import tn.esprit.careerlink.services.ITeamService;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/Team")
public class TeamController {
    private final ITeamService teamService;

    @PostMapping("/add")
    public Team addTeam(@RequestBody Team Team){
        return teamService.addTeam(Team);
    }
    @PutMapping("/update")
    public Team updateTeam(@RequestBody Team Team ){
        return teamService.updateTeam(Team);
    }

    @GetMapping("/getOne/{id}")
    public Team getOneTeam(@PathVariable ("id")Integer idTeam){
        return teamService.getOneTeam(idTeam);
    }

    @GetMapping("/getAll")
    public List<Team> getAllTeam(){
        return teamService.getAllTeam();
    }

    @DeleteMapping("/delete/{id}")
    public void  deleteTeam(@PathVariable ("id") Integer idTeam) {
        teamService.deleteTeam(idTeam);    }



}
