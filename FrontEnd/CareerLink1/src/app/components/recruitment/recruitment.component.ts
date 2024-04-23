import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recruitment } from 'src/app/models/Recruitment';
import { RecruitmentService } from 'src/app/services/recruitment.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent {
  constructor(private recService: RecruitmentService , private fb: FormBuilder, private router:Router) { 
  }

recruitments: Recruitment[] = [];
recForm!: FormGroup;
selectedRecruitment: Recruitment| null = null;
pagedRecruitments: Recruitment[] = []; 
currentPage: number = 1; 
pageSize: number = 3;
totalrecs: number = 0;

ngOnInit() {
  this.recService.findAllRecs()
  .subscribe(
    users => {
      this.totalrecs = users.length;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(startIndex + this.pageSize, this.totalrecs);
      this.pagedRecruitments = this.recruitments.slice(startIndex, endIndex);
    },
    error => console.error('Error while fetching recruitments', error)
  );
}

createForm(): void {
  this.recForm = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    numberRec: ['', [Validators.required]],
    user: ['', Validators.required],
  });
}


loadRecs(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;
const endIndex = Math.min(startIndex + this.pageSize, this.totalrecs);
this.recService.findAllRecs().subscribe(
users => {
  this.pagedRecruitments = this.recruitments.slice(startIndex, endIndex);
},
error => console.error('Error while fetching recruitments', error)
);
}

}
