import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { TimeOffTracker } from 'src/app/models/TimeOffTracker';
import { TimeofftrackerService } from 'src/app/services/timeofftracker.service';

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


   ngOnInit() :void {
     this.LoadListOfTimesOf();
     this.createForm();
   }

   constructor(private timeoffService :TimeofftrackerService , private formbilder: FormBuilder) {   
  }
   createForm() :void{
    this.timeoffForm = this.formbilder.group({
    
      leaveType: ['', Validators.required],
      description : ['', Validators.required],
      fromDate : ['', Validators.required],
      toDate : ['', Validators.required],
      user: ['', Validators.required],
      
    });
   }
   LoadListOfTimesOf() : void{  //Always add subscribe because observables are lazy 
      this.timeoffService.findAllTimesOff().subscribe( (timesOff:TimeOffTracker[] )=> {
        this.timesOff=  timesOff;
      } );
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
  this.timeoffService.deleteTiMEOff(id).subscribe ( ():void => {
  this.LoadListOfTimesOf();
  });
  }
 cancel():void {
 this.timeoffForm.reset();
 }

}
 


