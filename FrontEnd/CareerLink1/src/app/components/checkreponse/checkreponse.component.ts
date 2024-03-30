import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reclamation } from 'src/app/models/Reclamation';
import { Reponse } from 'src/app/models/Reponse';
import { ReponseService } from 'src/app/services/reponse.service';

@Component({
  selector: 'app-checkreponse',
  templateUrl: './checkreponse.component.html',
  styleUrls: ['./checkreponse.component.css']
})
export class CheckreponseComponent {
  constructor(private reponseService: ReponseService, private fb: FormBuilder) { }
  reponses: Reponse[] = [];
  reponseForm!: FormGroup;
   selectedReponse: Reponse | null = null;
   Reclamations: Reclamation[] = [];
   ngOnInit(): void {
    this.loadReponses();
    
  }
  loadReponses(): void{
    this.reponseService.findAllReponse()
    .subscribe(
      reponses => this.reponses =reponses,
      error => console.error('error, getallRep', error)
    );
  }

}
