import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { MethodPayment } from 'src/app/models/methodPayment';
import { TypeReclamation } from 'src/app/models/typeReclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReponseService } from 'src/app/services/reponse.service';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css']
})
export class ReponseComponent implements OnInit {
  reponses: Reponse[] = [];
  reponseForm!: FormGroup;
  selectedReponse: Reponse | null = null;
  reclamations: Reclamation[] = [];
  selectedReclamation: Reclamation | null = null; 
  reclamationId: number | undefined;
  

  constructor(
    private reponseService: ReponseService,
    private reclamationservice: ReclamationService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {  
    this.loadReponses();
    this.createForm();
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
        reponses => this.reponses = reponses,
        error => console.error('error, getallRep', error)
      );
  }

  loadReclamations(): void {
    this.reclamationservice.findAllReclamation()
      .subscribe(
        reclamations => this.reclamations = reclamations,
        error => console.error('error, getAllReclamations', error)
      );
  }

  createForm(): void {
    this.reponseForm = this.fb.group({
      datereponse: ['', [Validators.required]],
      reponsecontent: ['', [Validators.required]],
      reclamationId: ['', [Validators.required]]
    });
  }

  deleteReponse(idreponse: number): void {
    this.reponseService.deleteReponse(idreponse).subscribe(
      response => {
        console.log('success, deleteReponse', response);
        this.loadReponses();
      },
      error => console.error('error, deleteReponse', error)
    );
  }

  addReponseAndAffect(): void {
    const { datereponse, reponsecontent, reclamationId } = this.reponseForm.value;
  
    const reponse: Reponse = {
      idrponse: 0,
      datereponse: datereponse,
      reponsecontent: reponsecontent,
      reclamation: { 
        idreclamation: reclamationId, 
        datereclamation: new Date(), 
        description: '', 
        typeReclamation: TypeReclamation.EXCESSIVE_EXPENSES, 
        reponse: [],
        expense: { idexpense: 0, unitPrice: 0, quantity: 0, amount: 0, dateexpense: new Date(), category: '', methodPayment: MethodPayment.CARD,  project: { idProject: 0, name: '', description: '', dueDate: new Date(), price: 0, teams: [], tasks: [], expense: [] ,},reclamation: [] ,}
        
      }
    };
  
    this.reponseService.addReponseAndAffect(reclamationId, reponse)
      .subscribe(
        () => {
          console.log('success, addReponseAndAffect');
          this.loadReponses();
          this.reponseForm.reset();
        },
        error => console.error('error, addReponseAndAffect', error)
      );
  }

  cancel(): void {
    this.reponseForm.reset();
  }

  editReponse(reponse: Reponse): void {
    this.selectedReponse = reponse;
    this.reponseForm.patchValue({
      reponsecontent: reponse.reponsecontent,
      datereponse: new Date(reponse.datereponse)
    });
    if (this.selectedReponse) {
      this.reponseForm.get('reclamationId')!.disable(); // Désactiver le champ reclamationId
    } else {
      this.reponseForm.get('reclamationId')!.enable(); // Activer le champ reclamationId
    }
  }
  

  updateReponse(): void {
    if (this.selectedReponse && this.reponseForm.valid) {
      const updatedReponse = { ...this.selectedReponse, ...this.reponseForm.value } as Reponse;
      this.reponseService.updateReponse(updatedReponse).subscribe(
        response => {
          console.log('success, updatReponse', response);
          this.loadReponses();
          this.reponseForm.reset();
          this.selectedReponse = null;
        },
        error => console.error('error, updateReponse', error)
      );
    }
  }
}
