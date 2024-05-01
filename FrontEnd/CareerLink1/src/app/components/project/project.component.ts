import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { Expense } from 'src/app/models/Expense';
import { ProjectService } from 'src/app/services/project.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  newProject: Project = new Project();
  newExpense: Expense = new Expense();

  constructor(private projectService: ProjectService, private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.findAllProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    );
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
  }

  createProject(): void {
    this.projectService.createProject(this.newProject).subscribe(
      (createdProject) => {
        this.projects.push(createdProject);
        this.newProject = new Project();
      },
      (error) => {
        console.error('Error creating project:', error);
      }
    );
  }

  updateProject(): void {
    if (this.selectedProject) {
      this.projectService.updateProject(this.selectedProject).subscribe(
        (updatedProject) => {
          const index = this.projects.findIndex(p => p.id === updatedProject.id);
          if (index !== -1) {
            this.projects[index] = updatedProject;
          }
        },
        (error) => {
          console.error('Error updating project:', error);
        }
      );
    }
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(
      () => {
        this.projects = this.projects.filter(p => p.id !== id);
        this.selectedProject = null;
      },
      (error) => {
        console.error('Error deleting project:', error);
      }
    );
  }
  

  }

