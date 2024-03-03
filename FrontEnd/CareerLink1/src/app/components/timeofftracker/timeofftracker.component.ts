import { Component } from '@angular/core';
import { TimeOffTracker } from 'src/app/models/TimeOffTracker';
import { TimeofftrackerService } from 'src/app/services/timeofftracker.service';

@Component({
  selector: 'app-timeofftracker',
  templateUrl: './timeofftracker.component.html',
  styleUrls: ['./timeofftracker.component.css']
})
export class TimeofftrackerComponent {
   timesOff:TimeOffTracker[]=[];
    
   ngOnInit() :void {
     this.LoadListOfTimesOf();
   }

   constructor(private timeoffService :TimeofftrackerService){}

   LoadListOfTimesOf() : void{  //Always add subscribe because observables are lazy 
      this.timeoffService.findAllTimesOff().subscribe( (timesOff:TimeOffTracker[] )=> {
        this.timesOff=  timesOff;
      } );
   }
}
 


