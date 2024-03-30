import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { ReclamationService } from 'src/app/services/reclamation.service';



@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent {
  constructor(private reclamationService: ReclamationService, private fb: FormBuilder) { }
  reclamations: Reclamation[] = [];
 reclamationForm!: FormGroup;
  selectedReclamation: Reclamation | null = null;
  Reponses: Reponse[] = [];
  ngOnInit(): void {
    
    this.loadReclamations();
    this.createForm();
  }
  loadReclamations(): void{
    this.reclamationService.findAllReclamation()
    .subscribe(
      reclamations => this.reclamations =reclamations,
      error => console.error('error, getallRec', error)
    );
  }
  deleteReclamation(idreclamation :number): void {
    this.reclamationService.deleteReclamation(idreclamation).subscribe(
      response => {
        console.log('success, deleteReclamation', response);
        this.loadReclamations();
      },
      error => console.error('error, deleteReclamation', error)
    )
  }
  createForm(): void {
    this.reclamationForm = this.fb.group({
      
      
      datereclamation: ['', [Validators.required]],
      description: [null, [Validators.required]], 
      
      typeReclamation: ['', [Validators.required]]
        

      
      
    });
  }
  
  addReclamation(): void {
    const reclamation = this.reclamationForm.value;
    this.reclamationService.addReclamation(reclamation)
    .subscribe(
      response => {
        console.log('success, addReclamation', response);
        this.loadReclamations();
      },
      error => console.error('error, addReclamation', error)
    );
  }
  cancel():void {
    this.reclamationForm.reset();
    }
    editReclamation(reclamation: Reclamation): void {
      this.selectedReclamation = reclamation;
      this.reclamationForm.patchValue({
        description: reclamation.description,
       
        typeReclamation:reclamation.typeReclamation,
       
        datereclamation: new Date(reclamation.datereclamation)
      
       
      });
    }
    updateReclamation(): void {
      if (this.selectedReclamation && this.reclamationForm.valid) {
        const updatedReclamation = { ...this.selectedReclamation, ...this.reclamationForm.value } as Reclamation;
        this.reclamationService.updateReclamation(updatedReclamation).subscribe(
          response => {
            console.log('success, updatReclamation', response);
            this.loadReclamations();
            this.reclamationForm.reset();
            this.selectedReclamation=null;
          },
          error => console.error('error, updateReclamation', error)
        );
      }
    }
   
    
    

}
