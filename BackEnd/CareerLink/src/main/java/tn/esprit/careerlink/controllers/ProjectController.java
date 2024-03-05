package tn.esprit.careerlink.controllers;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.careerlink.entities.Project;
import tn.esprit.careerlink.services.IProjectService;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/Project")
public class ProjectController {
    private  final IProjectService projectService;
    @PostMapping("/add")
    public Project addProject(@RequestBody Project project){
        return projectService.addProject(project);
    }
    @PutMapping("/update")
    public Project updateProject(@RequestBody Project project ){
        return projectService.updateProject(project);
    }

    @GetMapping("/getOne/{id}")
    public Project getOneProject(@PathVariable ("id")Integer idProject){
        return projectService.getOneProject(idProject);
    }

    @GetMapping("/getAll")
    public List<Project> getAllProject(){
        return projectService.getAllProjects();
    }

    @DeleteMapping("/delete/{id}")
    public void  deleteProject(@PathVariable ("id") Integer idProject) {
        projectService.deleteProject(idProject);    }


}

