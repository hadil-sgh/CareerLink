import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { User } from 'src/app/models/User';
import { ExpenseService } from 'src/app/services/expense.service';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReponseService } from 'src/app/services/reponse.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admrec',
  templateUrl: './admrec.component.html',
  styleUrls: ['./admrec.component.css']
})
export class AdmrecComponent implements OnInit {
  reclamations: Reclamation[] = [];
  reclamationForm!: FormGroup;
  Reponses: Reponse[] = [];
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  users: User[] = [];
  selectedType: string = ''; // Variable pour stocker le type sélectionné

  constructor(
    private reclamationService: ReclamationService,
    private reponseservice: ReponseService,
    private expenseService: ExpenseService,
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sortReclamationsByImportance();
    this.loadReponses();
  }

  loadUsers(): void {
    this.userservice.findAllUsers()
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
          this.filteredProjects = projects; // Copiez tous les projets dans filteredProjects
        },
        error => console.error('error, getAllProjects', error)
      );
  }

  loadReclamations(): void {
    this.reclamationService.findAllReclamation()
      .subscribe(
        reclamations => this.reclamations = reclamations,
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
      // Aucune réponse associée à cette réclamation
      alert('Votre réclamation est en cours de traitement. Merci de vérifier à nouveau plus tard.');
    } else {
      // Il y a une réponse associée à cette réclamation
      // Naviguer vers le chemin approprié pour vérifier la réponse
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
      // Si aucun type n'est sélectionné, charger toutes les réclamations
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

  
  
  

  // Fonction pour déclencher le filtrage lorsque le type est sélectionné dans le menu déroulant
  onTypeSelected(type: string): void {
    this.selectedType = type;
    this.filterReclamationsByType();
  }
}
