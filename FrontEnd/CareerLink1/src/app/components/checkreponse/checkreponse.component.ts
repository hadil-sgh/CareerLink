import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReponseService } from 'src/app/services/reponse.service';

@Component({
  selector: 'app-checkreponse',
  templateUrl: './checkreponse.component.html',
  styleUrls: ['./checkreponse.component.css']
})
export class CheckreponseComponent {
  constructor(private reponseService: ReponseService, private reclamationservice: ReclamationService, private fb: FormBuilder) { }
  reponses: Reponse[] = [];
  reponseForm!: FormGroup;
   selectedReponse: Reponse | null = null;
   Reclamations: Reclamation[] = [];
   ngOnInit(): void {
    this.loadReponses();
    this.loadReclamations();
    
  }
  loadReponses(): void{
    this.reponseService.findAllReponse()
    .subscribe(
      reponses => this.reponses =reponses,
      error => console.error('error, getallRep', error)
    );
  }
  loadReclamations(): void {
    this.reclamationservice.findAllReclamation()
      .subscribe(
        Reclamations => this.Reclamations = Reclamations,
        error => console.error('error, getAllReclamations', error)
      );
  }


}
