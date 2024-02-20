package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Project;

import java.util.List;

public interface IProjectService {
    Project addProject(Project project);

    Project updateProject(Project project);

    Project getOneProject(Integer idProject);

    List<Project> getAllProjects();

    void deleteProject(Integer idProject);
}
