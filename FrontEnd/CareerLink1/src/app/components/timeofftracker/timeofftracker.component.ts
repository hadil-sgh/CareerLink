import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Observable } from 'rxjs';
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

   timesOff:TimeOffTracker[]=[];
   timeoffForm ! :FormGroup;
   leaveType :String[]=['Casual','Compassionate','Medical','Maternity','Other'];
   leaveStatus :String[]=['Pending','Accepted','Rejected'];
   users: User[] = [];

   ngOnInit() :void {
     this.LoadListOfTimesOf();
     
     this.createForm();
     this.loadUsers();
   
   }

   constructor(private timeoffService :TimeofftrackerService , private formbilder: FormBuilder, private userService: UserService) { }
  
   LoadListOfTimesOf() : void{ 

      this.timeoffService.findAllTimesOff().subscribe( (timesOff:TimeOffTracker[] )=> {
        this.timesOff=  timesOff;
      } );
   }
   createForm() :void{
    this.timeoffForm = this.formbilder.group({
    
      type: ['', Validators.required],
      description : ['', Validators.required],
      fromDate : ['', Validators.required],
      toDate : ['', Validators.required],
      user: ['', Validators.required],
      
    });
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
 cancel():void {
 this.timeoffForm.reset();
 }
 loadUsers(): void{
  this.userService.findAllUsers()
  .subscribe(
    users => this.users = users,
    error => console.error('error, getall', error)
  );
}



}
 


