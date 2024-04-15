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
  id!: number ;
  currentWeekGrade: number | undefined;
  stars: string[] = [];
  tasks:Task[]=[];
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
    this.getCurrentWeekGrade();
    this.loadTasks();
  }
  getCurrentWeekGrade() {
    this.timeoffservice.getCurrentWeekGrade(this.id).subscribe(
      (grade: number) => {
        console.log('the grade for this month', grade);
        this.currentWeekGrade = grade;
        // Convert grade to stars
        this.stars = this.getStars(grade);
        console.log('Stars:', this.stars); // Add this line for debugging
      },
      (error: any) => {
        console.error('Error fetching current week grade:', error);
      }
    );
  }
  loadTasks(): void {
    console.log('hi')
    this.timeoffservice.getTasksForUserThisMonth(this.id)
      .subscribe(
        tasks1 => {
          this.tasks = tasks1;
          console.log('tasks', this.tasks);
        },
        error => console.error('error, getall', error)
      );
  }
  
  
  getStars(grade: number): string[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < grade) {
        stars.push('checked');
      } else {
        stars.push('');
      }
    }
    return stars;
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