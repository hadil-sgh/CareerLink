import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js/auto';
import { Project } from 'src/app/models/Project';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { User } from 'src/app/models/User';
import { ExpenseService } from 'src/app/services/expense.service';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReponseService } from 'src/app/services/reponse.service';
import { UserService } from 'src/app/services/user.service';

Chart.register(...registerables);

@Component({
  selector: 'app-admrec',
  templateUrl: './admrec.component.html',
  styleUrls: ['./admrec.component.css']
})
export class AdmrecComponent implements OnInit, OnDestroy {
  @ViewChild('myChart') myChart!: ElementRef;
  @ViewChild('selectedProjectChart') selectedProjectChart!: ElementRef;
  chart!: Chart;
  selectedProject: Project | null = null;
  reclamations: Reclamation[] = [];
  reclamationForm!: FormGroup;
  Reponses: Reponse[] = [];
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  users: User[] = [];
  selectedType: string = '';
  projectReclamationStats: { [key: string]: number } = {};

  constructor(
    private reclamationService: ReclamationService,
    private reponseservice: ReponseService,
    private expenseService: ExpenseService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sortReclamationsByImportance();
    this.loadReponses();
    this.loadProjects();
    this.loadReclamations();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); // Détruire le graphique lors de la destruction du composant
    }
  }

  onProjectSelected(): void {
    if (this.selectedProject) {
      const projectName = this.selectedProject.name;
      const reclamationCount = this.countReclamationsByProject(projectName);
      this.projectReclamationStats = { [projectName]: reclamationCount };

      console.log('Project Name:', projectName);
      console.log('Reclamation Count:', reclamationCount);

      if (this.chart) {
        console.log('Updating existing chart...');
        this.chart.data.labels = [projectName];
        this.chart.data.datasets[0].data = [reclamationCount];
        this.chart.update();
      } else {
        console.log('Creating new chart...');
        this.createChart();
      }

      this.createSelectedProjectChart();
    } else {
      console.log('No project selected');
    }
  }

  createSelectedProjectChart(): void {
    if (this.selectedProject && this.selectedProjectChart) {
      const ctx = this.selectedProjectChart.nativeElement.getContext('2d');
      if (ctx) {
        const projectName = this.selectedProject.name;
        const reclamationCount = this.countReclamationsByProject(projectName);

        if (this.selectedProjectChart) {
          const selectedProjectChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: [projectName],
              datasets: [{
                label: '# of Reclamations',
                data: [reclamationCount],
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1
              }]
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Statistiques du Projet Sélectionné'
                }
              }
            }
          });
        }
      }
    }
  }

  calculateProjectReclamationStats(): void {
    this.projects.forEach(project => {
      const reclamationCount = this.countReclamationsByProject(project.name);
      this.projectReclamationStats[project.name] = reclamationCount;
    });
  }

  countReclamationsByProject(projectName: string): number {
    return this.reclamations.filter(reclamation => reclamation.expense.project.name === projectName).length;
  }

  createChart(): void {
    const ctx = this.myChart.nativeElement.getContext('2d');
    if (ctx) {
      if (this.chart) {
        this.chart.destroy(); // Détruire le graphique existant
      }
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.projectReclamationStats),
          datasets: [{
            label: '# of Reclamations',
            data: Object.values(this.projectReclamationStats),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Canvas context is null.');
    }
  }

  loadUsers(): void {
    this.userService.findAllUsers()
      .subscribe(
        users => {
          this.users = users;
          console.log('Utilisateurs chargés avec succès :', users);
        },
        error => console.error('Erreur lors du chargement des utilisateurs :', error)
      );
  }

  loadProjects(): void {
    this.expenseService.getAllProjects()
      .subscribe(
        projects => {
          this.projects = projects;
          this.filteredProjects = projects;
          this.calculateProjectReclamationStats();
          this.createChart(); // Appel à la méthode createChart après avoir chargé les projets
        },
        error => console.error('error, getAllProjects', error)
      );
  }

  loadReclamations(): void {
    this.reclamationService.findAllReclamation()
      .subscribe(
        reclamations => {
          this.reclamations = reclamations;
          this.calculateProjectReclamationStats();
          this.createChart(); // Appel à la méthode calculateProjectReclamationStats après avoir chargé les réclamations
        },
        error => console.error('Error loading reclamations:', error)
      );
  }

  loadReponses(): void {
    this.reponseservice.findAllReponse()
      .subscribe(
        reponses => this.Reponses = reponses,
        error => console.error('Error loading responses:', error)
      );
  }

  hasResponse(reclamation: Reclamation): boolean {
    return this.Reponses.some(response => response.reclamation.idreclamation === reclamation.idreclamation);
  }

  checkAnswer(reclamation: Reclamation): void {
    if (reclamation.reponse.length === 0) {
      alert('Votre réclamation est en cours de traitement. Merci de vérifier à nouveau plus tard.');
    } else {
      this.router.navigate(['/admin/answred', reclamation.idreclamation]);
    }
  }

  sortReclamationsByImportance(): void {
    this.reclamationService.getAllReclamationsSortedByImportance()
      .subscribe(
        reclamations => this.reclamations = reclamations,
        error => console.error('Error sorting reclamations by importance:', error)
      );
  }

  filterReclamationsByType(): void {
    if (this.selectedType !== '') {
      this.reclamationService.getReclamationsByType(this.selectedType)
        .subscribe(
          reclamations => this.reclamations = reclamations,
          error => console.error('Error filtering reclamations by type:', error)
        );
    } else {
      this.loadReclamations();
    }
  }

  verifyUnansweredReclamations(): void {
    this.reclamationService.verifyUnansweredReclamations()
      .subscribe(
        reclamations => {
          this.reclamations = reclamations.reclamationsNonRepondues;
          alert(`Total Unanswered Reclamations: ${reclamations.totalReclamationsNonRepondues}`);
        },
        error => console.error('Error verifying unanswered reclamations:', error)
      );
  }

  onTypeSelected(type: string): void {
    this.selectedType = type;
    this.filterReclamationsByType();
  }
}
