import { Component, ElementRef, ViewChild } from '@angular/core';
import { TimeOffTracker } from '../models/TimeOffTracker';
import { TimeofftrackerService } from '../services/timeofftracker.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveStatus } from '../models/LeaveStatus';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-takeofftraitment',
  templateUrl: './takeofftraitment.component.html',
  styleUrls: ['./takeofftraitment.component.css']
})
export class TakeofftraitmentComponent {
  timesOff:TimeOffTracker[]=[];
  timeoffForm !:FormGroup;
  constructor(private timeoffService :TimeofftrackerService,private route :ActivatedRoute , private formbilder: FormBuilder, private userService: UserService, private modalservice: NgbModal) { }
  @ViewChild('content') popupview !: ElementRef;
  users: User[] = [];
  pdfurl='';
  form!:FormGroup 
  timeoff!: any;

  id = this.route.snapshot.params['id'];
  timeOffTracker!: TimeOffTracker;
  ngOnInit() :void {
    this.LoadListOfTimesOf();
    this.loadUsers();
  
  }
 
  LoadListOfTimesOf() : void{ 

    this.timeoffService.findAllTimesOff().subscribe( (timesOff:TimeOffTracker[] )=> {
      this.timesOff=  timesOff;
      console.log("list of timesoff",this.timeoff)
    } );
 }
  
 getStatusIcon(status: LeaveStatus): string {
  switch (status) {
    case LeaveStatus.Pending:
      return "/assets/FrontOffice/img/pending.png"; 
    case LeaveStatus.Approved:
      return "/assets/FrontOffice/img/approved.png"; 
    case LeaveStatus.Rejected:
      return "/assets/FrontOffice/img/rejected.png"; 
    default:
      return ''; 
  }
}
getStatusColor(status: LeaveStatus): string {
  console.log('Status:', status);

  switch (status) {
    case LeaveStatus.Pending:
      return '#edb95e';
    case LeaveStatus.Approved:
      return '#82dd55'; 
    case LeaveStatus.Rejected:
      return '#e23636';
    default:
      return 'black'; 
  }
}

popUpModal() {
  const modalElement = document.querySelector('.bd-example-modal-lg') as HTMLElement;
  if (modalElement) {
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
    document.body.classList.add('modal-open');
  }
}  

closeModal() {
  const modalElement = document.querySelector('.bd-example-modal-lg') as HTMLElement;
  if (modalElement) {
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}

createForm(): void {
  this.timeoffForm = this.formbilder.group({
    status: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
  
  });
}

loadUsers(): void{
  this.userService.findAllUsers()
  .subscribe(
    users => this.users = users,
    error => console.error('error, getall', error)
  );
}

pdf(id: number): void {
  this.timeoffService.getPdf(id).subscribe(
    (blob: Blob) => { // Change HttpResponse<Blob> to Blob
      console.log('Response from server:', blob);
      // Process the Blob data as needed
      let url = window.URL.createObjectURL(blob);

      // Open the Blob URL in a new tab with the content type set to 'application/pdf'
      window.open(url, '_blank');
    
    },
    (error: HttpErrorResponse) => {
      console.error('Error fetching PDF:', error);
      // Handle error, show appropriate message to the user
      if (error.status === 404) {
        console.error('PDF not found.');
        // Additional error handling logic for 404 error
      } else {
        console.error('An unexpected error occurred.');
        // Additional error handling logic for other error codes
      }
    }
  );
}


Preview(id: number) {
  this.timeoffService.getPdf(id).subscribe(
    (blob: Blob | null) => {
      if (blob !== null && blob.size > 0) {
        console.log('Response from server:', blob);
        let url = window.URL.createObjectURL(blob);
        this.modalservice.open(this.popupview, { size: 'lg' });
        this.pdfurl = url;
      } else {
        // Display an alert when an empty Blob is returned
        this.showEmptyBlobAlert();
      }
    },
    (error: HttpErrorResponse) => {
      console.error('Error fetching PDF:', error);
      if (error.status === 404) {
        console.error('PDF not found.');
      } else {
        console.error('An unexpected error occurred.');
      }
    }
  );
}

showEmptyBlobAlert(): void {
  Swal.fire({
    icon: 'error',
    title: 'Empty PDF',
    text: 'There is no PDF attached to this  time off request.',
    confirmButtonText: 'OK'
  });
}
}
