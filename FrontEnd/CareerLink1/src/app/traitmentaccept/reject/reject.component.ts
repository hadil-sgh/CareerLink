import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeofftrackerService } from 'src/app/services/timeofftracker.service';
import Swal from 'sweetalert2';
import { Task2 } from 'src/app/models/Task2';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.css']
})
export class RejectComponent implements OnInit {
  timeoffForm!: FormGroup;
  id!: number;
  currentWeekGrade: number | undefined;
  stars: string[] = [];
  tasks: Task2[] = [];
  dayOffs: number = 0;
  daysLeft: number = 0;
  count: number = 0;
  countLeft: number = 0;
  intervalId: any;
  intervalIdLeft: any;
  isThereABlackout!: boolean; 
  constructor(
    private timeoffservice: TimeofftrackerService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.timeoffForm = this.formbuilder.group({
      status: ['', Validators.required]
    });
    this.isThereABlackoutfun();

    this.getCurrentWeekGrade();
    this.getDayOffByRole();
    this.getDaysLeft();
    this.loadTasks();
    this.startCounting();
  }
   isThereABlackoutfun() {
    this.timeoffservice.isThereABlackout(this.id).subscribe(
      (isThereABlackout: boolean) => {
        this.isThereABlackout = isThereABlackout; 
        console.log('blackouts', this.isThereABlackout);
      },
      (error: any) => {
        console.error('Error fetching day offs:', error);
      }
    );
  }
  getCurrentWeekGrade() {
    this.timeoffservice.getCurrentWeekGrade(this.id).subscribe(
      (grade: number) => {
        this.currentWeekGrade = grade;
        this.stars = this.getStars(grade);
        console.log("your grade is ",grade)
           },
      (error: any) => {
        console.error('Error fetching current week grade:', error);
      }
    );
  }

  getDayOffByRole() {
    this.timeoffservice.getDayOffByRole(this.id).subscribe(
      (dayOffs: number) => {
        this.dayOffs = dayOffs;
        console.log('daysoff',dayOffs)
      },
      (error: any) => {
        console.error('Error fetching day offs:', error);
      }
    );
  }

  getDaysLeft() {
    this.timeoffservice.getTotalTimeOff(this.id).subscribe(
      (daysLeft: number) => {
        this.daysLeft = daysLeft;
      },
      (error: any) => {
        console.error('Error fetching days left:', error);
      }
    );
  }

  loadTasks(): void {
    this.timeoffservice.getTasksForUserThisMonth(this.id).subscribe(
      tasks => {
        this.tasks = tasks;
      },
      (error: any) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  getStars(grade: number): string[] {
    console.log('Grade:', grade); // Log the grade value
    const fullStars = Math.floor(grade); // Get the integer part of the grade
    console.log('Full Stars:', fullStars); // Log the number of full stars
    const decimalPart = grade % 1; // Get the decimal part of the grade
    console.log('Decimal Part:', decimalPart); // Log the decimal part
  
    let halfStar = ''; // Initialize halfStar
  
    // Check if the decimal part is greater than or equal to 0.5
    if (decimalPart >= 0.5) {
      halfStar = 'half';
    }
  
    console.log('Half Star:', halfStar); // Log the status of half star
  
    const stars = [];
  
    // Push full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push('checked');
    }
  
    // Push half star if applicable
    if (halfStar !== '') {
      stars.push(halfStar);
    }
  
    console.log('Stars Array:', stars); // Log the final array of stars
  
    // Push remaining empty stars to complete 5 stars
    const totalStars = stars.length;
    for (let i = totalStars; i < 5; i++) {
      stars.push('');
    }
  
    console.log('Final Stars Array:', stars); // Log the final array of stars with empty stars
  
    return stars;
  }

  closeModal(): void {
    this.router.navigate(['/admin/TimeOffTracker']);
  }

  updateStatus() {
    if (this.id && this.timeoffForm.valid) {
      const status = this.timeoffForm.value.status;
      this.timeoffservice.updateStatus(this.id, status).subscribe(
        (res: any) => {
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

  startCounting() {
    this.intervalId = setInterval(() => {
      this.incrementCount();
    }, 50);
  }

 

  incrementCount() {
    this.count++;
    const countDisplay = document.getElementById('countDisplay');
    if (countDisplay) {
      countDisplay.textContent = this.count.toString();
      if (this.count >= this.dayOffs) {
        clearInterval(this.intervalId);
      }
    }
  }






  
  
  
  
}
