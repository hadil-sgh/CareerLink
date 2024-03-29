import { Component } from '@angular/core';
import { TimeOffTracker } from '../models/TimeOffTracker';
import { TimeofftrackerService } from '../services/timeofftracker.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveStatus } from '../models/LeaveStatus';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-takeofftraitment',
  templateUrl: './takeofftraitment.component.html',
  styleUrls: ['./takeofftraitment.component.css']
})
export class TakeofftraitmentComponent {
  timesOff:TimeOffTracker[]=[];
  timeoffForm !:FormGroup;
  constructor(private timeoffService :TimeofftrackerService , private formbilder: FormBuilder, private userService: UserService) { }
  users: User[] = [];


  ngOnInit() :void {
    this.LoadListOfTimesOf();
    this.loadUsers();


  
  }

 
  LoadListOfTimesOf() : void{ 

    this.timeoffService.findAllTimesOff().subscribe( (timesOff:TimeOffTracker[] )=> {
      this.timesOff=  timesOff;
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



}
