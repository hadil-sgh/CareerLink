package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Project;
import tn.esprit.careerlink.repositories.ProjectRepository;
import tn.esprit.careerlink.services.IProjectService;

import java.util.List;
@AllArgsConstructor
@Service
public class ProjectServiceImpl implements IProjectService {
    final ProjectRepository projectRepository;
    @Override
    public Project addProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Project getOneProject(Integer idProject) {
        return projectRepository.findById(idProject).orElse(null);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public void deleteProject(Integer idProject) {
        projectRepository.deleteById(idProject);
    }
}
