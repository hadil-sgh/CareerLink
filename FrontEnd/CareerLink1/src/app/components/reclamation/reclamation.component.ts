import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Expense } from 'src/app/models/Expense';
import { Project } from 'src/app/models/Project';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { MethodPayment } from 'src/app/models/methodPayment';
import {  StatusPayment } from 'src/app/models/statuspayment';
import { ExpenseService } from 'src/app/services/expense.service';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { DatePipe } from '@angular/common';

import { Router } from '@angular/router';





@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent {
  constructor(private reclamationService: ReclamationService,private expenseService:ExpenseService,  private datePipe: DatePipe // Injectez DatePipe ici
  , private route: ActivatedRoute, private fb: FormBuilder,private router: Router) { }
  reclamations: Reclamation[] = [];
 reclamationForm!: FormGroup;
  selectedReclamation: Reclamation | null = null;
  Reponses: Reponse[] = [];
  expenses:Expense[] = [];
  selectedExpense: Expense | null = null; 
  idexpense: number | undefined;
  forbiddenWords=['mot1','fuck','null'];
  ngOnInit(): void {
    this.loadReclamations();
    this.createForm();
    this.loadExpenses();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
          this.idexpense = parseInt(id, 10);
          this.reclamationForm.patchValue({ idexpense: this.idexpense });
      } else {
          // Gérer le cas où l'ID n'est pas trouvé dans les paramètres de l'URL
      }
  });
  }

  loadReclamations(): void{
    this.reclamationService.findAllReclamation()
    .subscribe(
      reclamations => this.reclamations =reclamations,
      error => console.error('error, getallRec', error)
    );
  }

  loadExpenses(): void{
    this.expenseService.findAllExpense()
    .subscribe(
      expenses => this.expenses =expenses,
      error => console.error('error, getallExp', error)
    );
  }

  deleteReclamation(idreclamation :number): void {
    this.reclamationService.deleteReclamation(idreclamation).subscribe(
      response => {
        console.log('success, deleteReclamation', response);
        alert('Claim deleted successfully.');
        this.loadReclamations();
      },
      error => {
        console.error('error, deleteExpense', error);
        // Afficher une alerte en cas d'échec
        alert('Failed to delete Claim. you cant removed ');
      }
    )
  }

  createForm(): void {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.reclamationForm = this.fb.group({
      datereclamation: [formattedDate, [Validators.required]],
      description: [null, [Validators.required]], 
      typeReclamation: ['', [Validators.required]],
      idexpense: ['', [Validators.required]]
    });
  }
  formatDate(date: string): string {
    if (!date) return '';
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
  

  addReclamationAndAffect(): void {
    const { datereclamation, description, typeReclamation, idexpense } = this.reclamationForm.value;
  
    const newReclamation: Reclamation = {
      idreclamation: 0,
      datereclamation: datereclamation,
      description: description,
      typeReclamation: typeReclamation,
      reponse: [],
      expense: { idexpense: idexpense, unitPrice: 0, quantity: 0, amount: 0, dateexpense: new Date(), category: '', methodPayment: MethodPayment.CARD, qrCodeData:'',
      qrCodeImageUrl:'',  statusPayment:StatusPayment.NONPAYE ,project: { idProject: 0, name: '', description: '', dueDate: new Date(), price: 0, teams: [], tasks: [], expense: [] ,},reclamation: [] ,}
    };

    const CommentaireData: Reclamation = this.reclamationForm.value;
    if (this.containsForbiddenWords(CommentaireData.description)) {
      alert('La reclamation contient des mots non acceptables.');
      return;
    }

    this.reclamationService.addReclamationAndAffect(idexpense, newReclamation)
      .subscribe(
        () => {
          console.log('success, addReclamationAndAffect');
          alert('cmail added successfully');
          this.loadReclamations();
          this.reclamationForm.reset();
        },
        error => console.error('error, addReclamationAndAffect', error)
      );
  }

  cancel():void {
    this.reclamationForm.reset();
  }

  editReclamation(reclamation: Reclamation): void {
    this.selectedReclamation = reclamation;
  
   
  
    const currentDate = new Date(); // Obtenir la date actuelle
  
    this.reclamationForm.patchValue({
      datereclamation: currentDate.toISOString().split('T')[0], // Mettre la date système dans le champ
      description: reclamation.description,
      typeReclamation: reclamation.typeReclamation
    });
  
    this.reclamationForm.get('idexpense')!.disable();
 
  }
  
  updateReclamation(): void {
    if (this.selectedReclamation && this.reclamationForm.valid) {
      const updatedReclamation = { ...this.selectedReclamation, ...this.reclamationForm.value } as Reclamation;
  
      const reclamationData: Reclamation = this.reclamationForm.value;
      if (this.containsForbiddenWords(reclamationData.description)) {
        alert('La réclamation contient des mots non acceptables.');
        return;
      }
  
      this.reclamationService.updateReclamation(updatedReclamation).subscribe(
        response => {
          console.log('success, updateReclamation', response);
          alert('claim updated successfully');
          this.loadReclamations();
          this.reclamationForm.reset();
          this.selectedReclamation = null;
        },
        error => console.error('error, updateReclamation', error)
      );
    }
  }
  
  
   
  containsForbiddenWords(comment: string): boolean {
    return this.forbiddenWords.some(word => comment.toLowerCase().includes(word.toLowerCase()));
  }    
  checkAnswer(reclamation: Reclamation): void {
    if (reclamation.reponse.length === 0) {
      // Aucune réponse associée à cette réclamation
      alert('Votre réclamation est en cours de traitement. Merci de vérifier à nouveau plus tard.');
    } else {
      // Il y a une réponse associée à cette réclamation
      // Naviguer vers le chemin approprié pour vérifier la réponse
      this.router.navigate(['/Employee/checkreponse', reclamation.idreclamation]);
    }
  }
  

}
