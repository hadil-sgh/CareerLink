import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReponseService } from 'src/app/services/reponse.service';

@Component({
  selector: 'app-admrec',
  templateUrl: './admrec.component.html',
  styleUrls: ['./admrec.component.css']
})
export class AdmrecComponent implements OnInit {
  reclamations: Reclamation[] = [];
  reclamationForm!: FormGroup;
  Reponses: Reponse[] = [];

  constructor(
    private reclamationService: ReclamationService,
    private reponseservice: ReponseService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
    this.loadReponses();
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
}
