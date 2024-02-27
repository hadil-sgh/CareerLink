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
@RequiredArgsConstructor
@RequestMapping("/Project")
public class ProjectController {
    private  final IProjectService projectService;
    @PostMapping("/add")
    public Project addStudent(@RequestBody Project project){
        return projectService.addProject(project);
    }
    @PutMapping("/update")
    public Project updateStudent(@RequestBody Project project ){
        return projectService.updateProject(project);
    }

    @GetMapping("/getOne/{id}")
    public Project getOneStudent(@PathVariable ("id")Integer idProject){
        return projectService.getOneProject(idProject);
    }

    @GetMapping("/getAll")
    public List<Project> getAllStudent(){
        return projectService.getAllProjects();
    }

    @DeleteMapping("/delete/{id}")
    public void  deleteStudent(@PathVariable ("id") Integer idProject) {
        projectService.deleteProject(idProject);    }


}

