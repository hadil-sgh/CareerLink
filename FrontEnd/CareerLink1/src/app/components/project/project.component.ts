import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { Expense } from 'src/app/models/Expense';
import { ProjectService } from 'src/app/services/project.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  projectForm: FormGroup;

  constructor(private projectService: ProjectService, private formBuilder: FormBuilder) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

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
    this.projectForm.patchValue({
      name: project.name,
      description: project.description,
      dueDate: project.dueDate,
      price: project.price
    });
  }

  updateProject(): void {
    if (this.selectedProject && this.projectForm.valid) {
      const updatedProject = { ...this.selectedProject, ...this.projectForm.value } as Project;
      this.projectService.updateProject(updatedProject).subscribe(
        (response) => {
          console.log('success, updateProject', response);
          this.loadProjects();
        },
        (error) => {
          console.error('error, updateProject', error);
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