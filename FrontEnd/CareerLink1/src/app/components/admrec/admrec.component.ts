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
  
  chart!: Chart;
  
  reclamations: Reclamation[] = [];
  reclamationForm!: FormGroup;
  Reponses: Reponse[] = [];
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  users: User[] = [];
  selectedType: string = '';
  projectReclamationStats: { [key: string]: number } = {};
  verifiedUnansweredReclamations: Reclamation[] = [];

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

    // Charger les données du graphique à partir du stockage
    const storedChartData = sessionStorage.getItem('chartData');
    if (storedChartData) {
      this.projectReclamationStats = JSON.parse(storedChartData);
      this.createChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); // Détruire le graphique lors de la destruction du composant
    }
  }

  onProjectSelected(): void {
    // Logique de sélection du projet...
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
  
          // Stocker les données du graphique dans sessionStorage
          sessionStorage.setItem('chartData', JSON.stringify(this.projectReclamationStats));
  
          console.log('Chart data stored in sessionStorage:', this.projectReclamationStats);
        },
        error => console.error('error, getAllProjects', error)
      );
  } sortReclamationsByImportance(): void {
    this.reclamationService.getAllReclamationsSortedByImportance()
    .subscribe(
      reclamations => {
        this.reclamations = reclamations;
        this.calculateProjectReclamationStats();
        this.createChart(); // Appel à la méthode calculateProjectReclamationStats après avoir chargé les réclamations

        // Stocker les données du graphique dans sessionStorage
        sessionStorage.setItem('chartData', JSON.stringify(this.projectReclamationStats));

        console.log('Chart data stored in sessionStorage:', this.projectReclamationStats);
      },
      error => console.error('Error loading reclamations:', error)
    );
  }
  
  loadReclamations(): void {
    this.reclamationService.findAllReclamation()
      .subscribe(
        reclamations => {
          this.reclamations = reclamations;
          this.calculateProjectReclamationStats();
          this.createChart(); // Appel à la méthode calculateProjectReclamationStats après avoir chargé les réclamations
  
          // Stocker les données du graphique dans sessionStorage
          sessionStorage.setItem('chartData', JSON.stringify(this.projectReclamationStats));
  
          console.log('Chart data stored in sessionStorage:', this.projectReclamationStats);
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

  checkAnswer(reclamation: Reclamation): void {
    if (reclamation.reponse.length === 0) {
      alert('Votre réclamation est en cours de traitement. Merci de vérifier à nouveau plus tard.');
    } else {
      this.router.navigate(['/admin/answred', reclamation.idreclamation]);
    }
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
 


  hasResponse(reclamation: Reclamation): boolean {
    return this.Reponses.some(response => response.reclamation.idreclamation === reclamation.idreclamation);
  }
  
  

  onTypeSelected(type: string): void {
    this.selectedType = type;
    this.filterReclamationsByType();
  }
}
