import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReponseService } from 'src/app/services/reponse.service';

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

  

  constructor(
    private datePipe: DatePipe ,
    private reponseService: ReponseService,
    private reclamationservice: ReclamationService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {  
    this.loadReponses();
    
    this.loadReclamations();

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
