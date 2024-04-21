import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PerformanceService } from 'src/app/services/performence.service';
import { Performance } from 'src/app/models/Performence';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-performence',
  templateUrl: './performence.component.html',
  styleUrls: ['./performence.component.css']
})
export class PerformenceComponent implements OnInit {
  constructor(private performanceService: PerformanceService, private fb: FormBuilder,private userServive:UserService) { }
  
  performanceList: Performance[] = [];
  users: User[] = [];
  performanceForm!: FormGroup;
  selectedPerformance: Performance | null = null;
  selectedStars: number = 0;

  ngOnInit(): void {
    this.loadPerformanceList();
    this.createForm();
    this.loadusers();
  }


  createForm(): void {
    this.performanceForm = this.fb.group({
      grade: [null], // We'll set the grade value dynamically
      comment: [''],
      week: [''],
      user: [''],
    });

    // Subscribe to changes in the 'week' form control
    this.performanceForm.get('week')?.valueChanges.subscribe((selectedMonth: number) => {
      console.log('Selected month number:', selectedMonth);
    });
  }

  loadPerformanceList(): void {
    this.performanceService.getAllPerformance()
        .subscribe(
            performanceList => {
                this.performanceList = performanceList;
                console.log('Fetched performance list:', performanceList);
            },
            error => console.error('Error fetching performance list:', error)
        );
  }
 loadusers(): void {
    this.userServive.findAllUsers()
        .subscribe(
          users => {
                this.users = users;
                console.log('all users:', users);
            },
            error => console.error('Error fetching users list:', error)
        );
  }
  addPerformance(): void {
    const performance = this.performanceForm.value as Performance;
    performance.grade = this.selectedStars;
    performance.idperformence = 0; // Set idperformence to 0

    // Extracting only the user id
    performance.user = { id: performance.user.id } as User;

    this.performanceService.addPerformance(performance)
        .subscribe(
            (response: any) => {
                console.log('Success adding performance:', response);
                this.loadPerformanceList();
                this.resetForm();
            },
            (error: any) => console.error('Error adding performance:', error)
        );
}




  editPerformance(performance: Performance): void {
    this.selectedPerformance = performance;
    this.performanceForm.patchValue({
      // Patch form values based on the selected performance
    });
  }

  updatePerformance(): void {
    if (this.selectedPerformance && this.performanceForm.valid) {
      const updatedPerformance = { ...this.selectedPerformance, ...this.performanceForm.value } as Performance;
      this.performanceService.updatePerformance(updatedPerformance).subscribe(
        (response: any) => {
          console.log('Success updating performance:', response);
          this.loadPerformanceList();
          this.resetForm();
          this.selectedPerformance = null;
        },
        (error: any) => console.error('Error updating performance:', error)
      );
    }
  }

  deletePerformance(id: number): void {
    this.performanceService.deletePerformance(id).subscribe(
      (response: any) => {
        console.log('Success deleting performance:', response);
        this.loadPerformanceList();
      },
      (error: any) => console.error('Error deleting performance:', error)
    );
  }

  resetForm(): void {
    this.performanceForm.reset();
    this.selectedStars = 0;
  }

  selectStars(starCount: number): void {
    this.selectedStars = starCount;
  }
}
