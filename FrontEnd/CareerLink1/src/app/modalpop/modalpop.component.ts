import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeofftrackerService } from '../services/timeofftracker.service';
import { TimeOffTracker } from '../models/TimeOffTracker';

@Component({
  selector: 'app-modalpop',
  templateUrl: './modalpop.component.html',
  styleUrls: ['./modalpop.component.css']
})
export class ModalpopComponent implements OnInit {
  form!: FormGroup;
  timeoff: TimeOffTracker = new TimeOffTracker();
  id !: number ;

  constructor(
    private timeoffservice: TimeofftrackerService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.timeoffservice.findoneTimesOff(this.id).subscribe(
      (data: TimeOffTracker) => {
        this.timeoff = data;
        this.initializeForm();
      },
      error => console.log(error)
    );
  }

  initializeForm(): void {
    this.form = this.formbuilder.group({
      type: [this.timeoff.type, Validators.required],
      description: [this.timeoff.description, Validators.required],
      fromDate: [this.timeoff.fromDate, Validators.required],
      toDate: [this.timeoff.toDate, Validators.required],
    });
  }

  updateTimeOffTracker(): void {
    console.log("Button pressed");
    const formValue = this.form.value;
    this.timeoffservice.updateTimeOff(this.id, formValue).subscribe(
      (data: any) => {
        console.log("updateTimeOff() called");
        console.log(data);
        this.goToList();
      },
      (error: any) => console.log(error)
    );
  }

  closeModal(): void {
    const modalElement = document.querySelector('.bd-example-modal-lg') as HTMLElement;
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

  goToList(): void {
    this.router.navigate(['/Employee/TimeOffTracker']);
  }
}
