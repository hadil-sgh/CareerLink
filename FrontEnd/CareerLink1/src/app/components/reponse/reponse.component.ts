import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { MethodPayment } from 'src/app/models/methodPayment';
import {  StatusPayment } from 'src/app/models/statuspayment';
import { TypeReclamation } from 'src/app/models/typeReclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReponseService } from 'src/app/services/reponse.service';
import { DatePipe } from '@angular/common';
import { Role } from 'src/app/models/Role';
import { TwilioService } from 'src/app/services/twilio.service';

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
  showEditDeleteButtons = true; // Variable pour contrôler la visibilité des boutons Edit/Delete
  confirmButtonClicked = false;

  showConfirmButton = false;


  

  constructor(
    private datePipe: DatePipe ,
    private reponseService: ReponseService,
    private reclamationservice: ReclamationService,
    private fb: FormBuilder,
    private twilioService:TwilioService,
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

  createForm(): void {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.reponseForm = this.fb.group({
      datereponse: [formattedDate, [Validators.required]],
      reponsecontent: ['', [Validators.required]],
      reclamationId: ['', [Validators.required]]
    });
  }

  deleteReponse(idreponse: number): void {
    this.reponseService.deleteReponse(idreponse).subscribe(
      response => {
        console.log('success, deleteReponse', response);
        alert('Response deleted successfully.');

        this.loadReponses();
      },
      error => {
        console.error('error, deleteExpense', error);
        // Afficher une alerte en cas d'échec
        alert('Failed to delete Response. you cant removed ');
      }
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
        expense: { idexpense: 0, unitPrice: 0, quantity: 0, amount: 0, dateexpense: new Date(), category: '', methodPayment: MethodPayment.CARD,  
        statusPayment:StatusPayment.NONPAYE , project: { idProject: 0, name: '', description: '', dueDate: new Date(), price: 0, teams: [], tasks: [], expense: [] ,},reclamation: [],user: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          cin: 1234567890,
          phoneNumber: 123456789,
          address: '123 Main St',
          birthday: new Date('1990-01-01'),
          recdate: new Date(),
          role: Role.Consultant, // Par exemple, définissez le rôle de l'utilisateur
          email: 'john.doe@example.com',
          expense: [] // Laissez vide ou mettez à jour avec les dépenses de l'utilisateur si nécessaire
        }}
        
      }
    };
  
    this.reponseService.addReponseAndAffect(reclamationId, reponse)
      .subscribe(
        () => {
          console.log('success, addReponseAndAffect');
          alert('response added successfully');
          this.loadReponses();
          this.reponseForm.reset();
          this.showConfirmButton = true;
         // Masquer les boutons Edit/Delete après la mise à jour
        },
        error => console.error('error, addReponseAndAffect', error)
        

      );
  }

  cancel(): void {
    this.reponseForm.reset();
  }

  editReponse(reponse: Reponse): void {
    this.selectedReponse = reponse;
    const currentDate = new Date();
    this.reponseForm.patchValue({
      reponsecontent: reponse.reponsecontent,
      datereponse: currentDate.toISOString().split('T')[0],
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
          alert('response updated successfully');
          this.loadReponses();
          this.reponseForm.reset();
          this.selectedReponse = null;
        },
        error => console.error('error, updateReponse', error)
        
      );
    }
  }
  confirmAdd(): void {
    const userPhoneNumber = '+21627345496'; // Numéro de téléphone cible
    
    const message = 'Votre réclamation a été traitée et répondue. Merci de vérifier la réponse.';
    
    // Appeler le service Twilio pour envoyer un message au numéro de téléphone
    this.twilioService.sendMessage(message, userPhoneNumber).subscribe(
      () => {
        console.log('Message sent successfully to', userPhoneNumber);
        alert('un message sera envoyer au utlisateur ');

        // Masquer les boutons Edit/Delete après l'envoi du message
        this.showConfirmButton = false; // Masquer le bouton "Confirm Answer" après avoir été cliqué
        this.confirmButtonClicked = true; // Définir confirmButtonClicked sur true
        this.showEditDeleteButtons=false;
      },
      error => {
        console.error('Error sending message to', userPhoneNumber, error);
        // Afficher un message d'erreur (à personnaliser selon vos besoins)
        alert('Une erreur s\'est produite lors de l\'envoi du message.');
      }
    );
  }
  
  
  
  

  // Restaure la visibilité des boutons Edit et Delete après une action
  restoreEditDeleteButtons(): void {
    this.showEditDeleteButtons = true;
  }
 
}
