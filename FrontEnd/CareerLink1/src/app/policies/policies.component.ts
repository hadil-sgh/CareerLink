import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Daysoffbyrole, Role } from '../models/Daysoffbyrole';
import { TimeofftrackerComponent } from '../components/timeofftracker/timeofftracker.component';
import { TimeofftrackerService } from '../services/timeofftracker.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent {
  constructor(private daysoffService: TimeofftrackerService, private fb: FormBuilder) { }
  daysoffList: Daysoffbyrole[] = [];
  daysoffForm!: FormGroup;
  selectedDaysoff: Daysoffbyrole | null = null;
  roles: Role[] = Object.values(Role); // Array containing all enum values


  loadDaysoffList(): void {
    this.daysoffService.getAllDaysoff()
      .subscribe(
        daysoffList => {
          this.daysoffList = daysoffList;
          console.log(this.daysoffList);
        },
        error => console.error('Error fetching daysoff list:', error)
      );
  }
  

  ngOnInit(): void {
    this.loadDaysoffList();
    this.createForm();
  }

  createForm(): void {
    this.daysoffForm = this.fb.group({
      role: ['', [Validators.required]],
      daysoff: [null, [Validators.required]],
    });
  }

  addDaysoff(): void {
    const daysoff = this.daysoffForm.value as Daysoffbyrole;
    this.daysoffService.addDaysoff(daysoff)
      .subscribe(
        response => {
          console.log('Success adding daysoff:', response);
          this.loadDaysoffList();
        },
        error => console.error('Error adding daysoff:', error)
      );
  }

  cancel(): void {
    this.daysoffForm.reset();
  }

  editDaysoff(daysoff: Daysoffbyrole): void {
    this.selectedDaysoff = daysoff;
    this.daysoffForm.patchValue({
      role: daysoff.role,
      daysoff: daysoff.daysoff,
    });
  }

  updateDaysoff(): void {
    if (this.selectedDaysoff && this.daysoffForm.valid) {
      const updatedDaysoff = { ...this.selectedDaysoff, ...this.daysoffForm.value } as Daysoffbyrole;
      this.daysoffService.updateDaysoff(updatedDaysoff).subscribe(
        response => {
          console.log('Success updating daysoff:', response);
          this.loadDaysoffList();
          this.daysoffForm.reset();
          this.selectedDaysoff = null;
        },
        error => console.error('Error updating daysoff:', error)
      );
    }
  }

  deleteDaysoff(id: number): void {
    this.daysoffService.deleteDaysoff(id).subscribe(
      response => {
        console.log('Success deleting daysoff:', response);
        this.loadDaysoffList();
      },
      error => console.error('Error deleting daysoff:', error)
    );
  }
}
