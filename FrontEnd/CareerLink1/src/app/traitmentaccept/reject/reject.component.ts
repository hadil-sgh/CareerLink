import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeofftrackerService } from 'src/app/services/timeofftracker.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.css']
})
export class RejectComponent implements OnInit {
  timeoffForm!: FormGroup;
  id: number | undefined;

  constructor(
    private timeoffservice: TimeofftrackerService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the ID from route params
    this.id = this.route.snapshot.params['id'];

    this.timeoffForm = this.formbuilder.group({
      status: ['', Validators.required]
    });
  }

  closeModal() :void{
      this.router.navigate(['/admin/TimeOffTracker']);
    
  }

  updateStatus() {
    if (this.id && this.timeoffForm.valid) { // Check if ID is available and form is valid
      const status = this.timeoffForm.value.status;
      this.timeoffservice.updateStatus(this.id, status).subscribe(
        (res: any) => {
          console.log('Status updated successfully:', res);
          Swal.fire('Status updated successfully!');
          this.closeModal();
        },
        (error: any) => {
          console.error('Error updating status:', error);
          
        }
      );
    } else {
      console.error('ID is missing or form is invalid. ID:', this.id);
    }
}
}