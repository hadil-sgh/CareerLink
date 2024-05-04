import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeofftrackerService } from 'src/app/services/timeofftracker.service';
import Swal from 'sweetalert2';
import { Task } from 'src/app/models/Task';

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
  tasks: Task[] = [];
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
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < grade ? 'checked' : '');
    }
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
