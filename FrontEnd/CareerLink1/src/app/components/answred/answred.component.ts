import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { User } from 'src/app/models/User';
import { ExpenseService } from 'src/app/services/expense.service';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReponseService } from 'src/app/services/reponse.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-answred',
  templateUrl: './answred.component.html',
  styleUrls: ['./answred.component.css']
})
export class AnswredComponent {
  reponses: Reponse[] = [];
  reponseForm!: FormGroup;
  selectedReponse: Reponse | null = null;
  reclamations: Reclamation[] = [];
  selectedReclamation: Reclamation | null = null; 
  reclamationId: number | undefined;

  projects: Project[] = [];
  filteredProjects: Project[] = [];
  users: User[] = [];

  constructor(
    private datePipe: DatePipe ,
    private reponseService: ReponseService,
    private reclamationservice: ReclamationService,
    private fb: FormBuilder,
    private userservice:UserService,
    private expenseService:ExpenseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {  
    this.loadReponses();
    
    this.loadReclamations();
  this.loadProjects();
  this.loadUsers();
    // Récupération de l'ID de réclamation depuis l'URL
    this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id !== null) {
            this.reclamationId = parseInt(id, 10); // Assurez-vous que l'ID est bien récupéré sous forme de nombre
            this.reponseForm.patchValue({ reclamationId: this.reclamationId }); // Mettre à jour le champ du formulaire avec l'ID récupéré
        } else {
            // Gérer le cas où l'ID n'est pas trouvé dans les paramètres de l'URL
        }
    });
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


loadReponses(): void {
  this.reponseService.findAllReponse()
    .subscribe(
      reponses => {
        // Filtrer les réponses par ID de réclamation sélectionné
        this.reponses = reponses.filter(reponse => reponse.reclamation.idreclamation === this.reclamationId);
      },
      error => console.error('Erreur lors du chargement des réponses :', error)
    );
}

  loadReclamations(): void {
    this.reclamationservice.findAllReclamation()
      .subscribe(
        reclamations => this.reclamations = reclamations,
        error => console.error('error, getAllReclamations', error)
      );
  }


}
