import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TimeofftrackerService } from '../services/timeofftracker.service';
import { from } from 'rxjs';
import { TimeOffTracker } from '../models/TimeOffTracker';

@Component({
  selector: 'app-modalpop',
  templateUrl: './modalpop.component.html',
  styleUrls: ['./modalpop.component.css']
})
export class ModalpopComponent {
  form!:FormGroup 
  oneTimeOff :any;
  timeoff!: any;
  
  id = this.route.snapshot.params['id'];
  timeOffTracker!: TimeOffTracker;
  constructor(private timeoffservice:TimeofftrackerService , private route :ActivatedRoute,private formbuilder : FormBuilder ,private router : Router) { 
    console.log('ModalpopComponent loaded!');

  }
  ngOnInit(): void {
    this.timeoff = new TimeOffTracker();
    this.id = this.route.snapshot.params['id'];  
       this.timeoffservice.findoneTimesOff(this.id).subscribe(
       data => {
         console.log(data);
         this.timeoff = data;
       },
       error => console.log(error)
     );
    console.log('ModalpopComponent initialized!');
    this.form = this.formbuilder.group({
      // Define your form controls here
      type: ['', Validators.required],
      description: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      // Add other form controls as needed
  });
  }
  FindoneTimesOff(){
    this.timeoffservice.findoneTimesOff(this.id).subscribe(
      (res: any) => {
        this.oneTimeOff = res;
        console.log('one time off', this.oneTimeOff);
        this.form.patchValue({
          type: this.oneTimeOff.type,
          description: this.oneTimeOff.description,
          fromDate: this.oneTimeOff.fromDate,
          toDate: this.oneTimeOff.toDate,
          status: this.oneTimeOff.status,
          user: this.oneTimeOff.user,
          pdf: this.oneTimeOff.pdf
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  updateTimeOffTracker(): void {
    console.log("Button pressed"); // Log when the button is pressed
    this.timeoffservice.updateTimeOff(this.id, this.timeoff).subscribe(
      (data: any) => {
        console.log("updateTimeOff() called"); // Log when updateTimeOff() is called
        console.log(data);
       this.goToList()        
      },
      (error: any) => console.log(error)
    );
  }
  
 
  closeModal() {
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
