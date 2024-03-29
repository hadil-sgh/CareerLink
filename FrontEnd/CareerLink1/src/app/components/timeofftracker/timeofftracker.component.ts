import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { LeaveStatus } from 'src/app/models/LeaveStatus';
import { TimeOffTracker } from 'src/app/models/TimeOffTracker';
import { User } from 'src/app/models/User';
import { TimeofftrackerService } from 'src/app/services/timeofftracker.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-timeofftracker',
  templateUrl: './timeofftracker.component.html',
  styleUrls: ['./timeofftracker.component.css']
})

export class TimeofftrackerComponent {
 
  selectedtimesOff: TimeOffTracker | null = null;
   timesOff:TimeOffTracker[]=[];
   timeoffForm ! :FormGroup;
   leaveType :String[]=['Casual','Compassionate','Medical','Maternity','Other'];
   leaveStatus :String[]=['Pending','Accepted','Rejected'];
   users: User[] = [];
   p : number = 1 ;
   itemsPerPage:number =6;
   totalldisplay:any;
   
   ngOnInit() :void {
     this.LoadListOfTimesOf();
     this.createForm();
     this.loadUsers();
     this.totalldisplay 
   
   }
   constructor(private timeoffService :TimeofftrackerService , private formbilder: FormBuilder, private userService: UserService) { }
   
   updateTimeOff(): void {

    if (this.selectedtimesOff && this.timeoffForm.valid) {
      const updateleave= { ...this.selectedtimesOff, ...this.timeoffForm.value } as TimeOffTracker;
      this.timeoffService.updateTiMEOff(updateleave).subscribe(
        response => {
          console.log('success, updateUser', response);
          this.loadUsers();
          this.timeoffForm.reset();
          this.selectedtimesOff=null;
        },
        error => console.error('error, updateUser', error)
      );
    }
  }
  editTimeOff(timeoff :TimeOffTracker): void {
    this.selectedtimesOff = timeoff;
    this.timeoffForm.patchValue({
      type: timeoff.type,
      description: timeoff.description,
      fromDate: timeoff.fromDate,
      toDate:timeoff.toDate,
      user: timeoff.user
     
    });
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
  showAlert(): void {
    Swal.fire({
      icon: 'info',
      title: "Can't edit ",
      text: 'This time off request has already been treated.',
      showCancelButton: false,
      confirmButtonText: 'OK',
    });
  }
  getStatusColor(status: LeaveStatus): string {
    console.log('Status:', status);
  
    switch (status) {
      case LeaveStatus.Pending:
        return '#edb95e';
      case LeaveStatus.Approved:
        return '#82dd55'; // RGB representation for green
      case LeaveStatus.Rejected:
        return '#e23636';
      default:
        return 'black'; // or any default color
    }
  }
  
  

   LoadListOfTimesOf() : void{ 

      this.timeoffService.findAllTimesOff().subscribe( (timesOff:TimeOffTracker[] )=> {
        this.timesOff=  timesOff;
      } );
   }
   createForm(): void {
    this.timeoffForm = this.formbilder.group({
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      fromDate: ['', [Validators.required, this.dateGreaterThanTodayValidator]],
      toDate: ['', [Validators.required/* , this.toDateValidator */]],
      user: ['', Validators.required],
    });
  }

popUpModal(timeoff: any) {
  // Set the form values with the properties of the timeoff object
  this.timeoffForm.patchValue({
    type: timeoff.type,
    description: timeoff.description,
    fromDate: new Date(timeoff.fromDate),
    toDate: new Date(timeoff.toDate)
  });

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
  
  
 

   addTimeOff(): void {
    
    const newtimeoff = this.timeoffForm.value;
   

    this.timeoffService.TakeTiMEOff(newtimeoff)
    .subscribe(
      response => {  
        console.log('success, add', response);
        this.LoadListOfTimesOf();
      },
      
      error => console.error('error, add', error)
    );
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'swal-center',
      },
    });
    
  } 


 deletetimeOff(id: number):void {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.timeoffService.deleteTiMEOff(id).subscribe ( ():void => {
    
        this.LoadListOfTimesOf();
        });
      Swal.fire({
        title: "Deleted!",
        text: "this time Off rquest has been deleted.",
        icon: "success"
      });
    }
  });
  
  }
 
  cancel(): void {
    this.timeoffForm.reset(); 
    this.closeModal(); 
  }
  
 
 loadUsers(): void{
  this.userService.findAllUsers()
  .subscribe(
    users => this.users = users,
    error => console.error('error, getall', error)
  );
}



//form control functions


getMaxAllowedDays(type: string): number {
  switch (type) {
    case 'Casual':
      return 1;
    case 'Medical':
      return 7;
    case 'Maternity':
      return 30; 
    default:
      return 0;
  }
}


dateGreaterThanTodayValidator(control: FormControl) {
  const selectedDate = new Date(control.value);

  if (isNaN(selectedDate.getTime())) {
    // Return null if the date is not a valid date
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate date comparison

  return selectedDate >= today ? null : { dateGreaterThanToday: true };
}

toDateValidator(control: FormControl) {
  const toDate = new Date(control.value);
  const fromDate = new Date(this.timeoffForm.controls['fromDate'].value);
  const leaveType = this.timeoffForm.controls['type'].value;

  if (leaveType === 'Casual' || leaveType === 'Medical' || leaveType === 'Maternity') {
    const maxAllowedDays = this.getMaxAllowedDays(leaveType);

    if (!isNaN(toDate.getTime()) && !isNaN(fromDate.getTime())) {
      const differenceInDays = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));

      return differenceInDays <= maxAllowedDays ? null : { maxAllowedDaysExceeded: true };
    }
  }

  return null;
}









}
 


