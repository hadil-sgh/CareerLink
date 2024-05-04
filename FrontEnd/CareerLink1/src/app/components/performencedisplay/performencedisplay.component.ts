import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PerformanceService } from 'src/app/services/performence.service';
import { Performance } from 'src/app/models/Performence';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import {  Task } from 'src/app/models/Task';
import { Status } from 'src/app/models/Status';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-performencedisplay',
  templateUrl: './performencedisplay.component.html',
  styleUrls: ['./performencedisplay.component.css']
})
export class PerformencedisplayComponent {
  constructor(private performanceService: PerformanceService, private fb: FormBuilder,private userServive:UserService) { }
  
  performanceList: Performance[] = [];
  users: User[] = [];
  tasks: Task[] = [];
  stars: string[] = [];
  count: number = 0;
  p : number = 1 ;
  itemsPerPage:number =6;
  countLeft: number = 0;
  intervalId: any;
  intervalIdLeft: any;
  teamNames:any;
  performanceForm!: FormGroup;
  performanceForm2!: FormGroup;
  selectedPerformance: Performance | null = null;
  selectedStars: number = 0;

  ngOnInit(): void {
    this.loadPerformanceList();
    this.createForm();
    this.createForm2();
    this.loadusers();
    this.loadteamname();
    this.loadTasks(); 
    this.startCounting();

  }
  
  
  loadTasks(): void {
  
    this.performanceForm.get('user')?.valueChanges.subscribe((selectedUser: User) => {
      if (selectedUser) { 
        this.performanceService.getTasksForUserThisMonth(selectedUser.id).subscribe(
          tasks => {
            this.tasks = tasks;
          },
          (error: any) => {
            console.error('Error fetching tasks:', error);
          }
        );
      }
    });
  }
  getImageSource(status: string): string {
    let statusEnum: Status;

    switch (status) {
        case 'Doing':
            statusEnum = Status.Doing;
            break;
        case 'Done':
            statusEnum = Status.Done;
            break;
        case 'To_do':
            statusEnum = Status.To_do;
            break;
        default:
            return '';
    }

    let imagePath = '';

    switch (statusEnum) {
        case Status.Doing:
            imagePath = 'assets/FrontOffice/img/progress.png';
            break;
        case Status.Done:
            imagePath = 'assets/FrontOffice/img/done.png';
            break;
        case Status.To_do:
            imagePath = 'assets/FrontOffice/img/no.png';
            break;
        default:
            imagePath = '';
            break;
    }

    console.log('Image path:', imagePath);
    return imagePath;
}


getStars(grade: number): string[] {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(i < grade ? 'checked' : '');
  }
  return stars;
}


  loadteamname(): void {
    this.performanceForm.get('user')?.valueChanges.subscribe((selectedUser: User) => {
      if (selectedUser) { 
        this.performanceService.getTeamNamesByUser(selectedUser.id).subscribe(
          teamNames => {
            // Assuming this will set the team names to a property called teamNames in your component
            this.teamNames = teamNames;
          },
          (error: any) => {
            console.error('Error fetching team names:', error);
          }
        );
      }
    });
  }
  

  createForm(): void {
    this.performanceForm = this.fb.group({
      week: [''], // Ensure to include the month control
      year: [''],
    });
  
    // Subscribe to changes in the 'month' form control
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
// Inside your component class
openEditModal(performance: Performance): void {
  this.selectedPerformance = performance;
  console.log('selectd form',performance)

  const modal = document.getElementById('editPerformanceModal');
  if (modal) {
    modal.style.display = 'block';
  }
}
closeEditModal(): void {
  const modal = document.getElementById('editPerformanceModal');
  if (modal) {
    modal.style.display = 'none';
  }
}
createForm2(): void {
  this.performanceForm2 = this.fb.group({
    grade: [''], // Define editGrade form control
    comment: [''], // Define editComment form control
    // Add other form controls as needed
  });
}

updatePerformance(): void {
  if (this.selectedPerformance && this.performanceForm.valid) {
    const updatedPerformance = { ...this.selectedPerformance, ...this.performanceForm2.value } as Performance;
    updatedPerformance.user = { id: updatedPerformance.user.id } as User;

console.log('updated form',updatedPerformance)
    this.performanceService.updatePerformance(updatedPerformance).subscribe(
      (response: any) => {
        this.loadPerformanceList();
        console.log('Success updating performance:', response);
        // Optionally, you can reload the performance list or perform other actions
        // Close the modal
        const modal = document.getElementById('editPerformanceModal');
        if (modal) {
          modal.style.display = 'none';
        }
      },
      (error: any) => console.error('Error updating performance:', error)
    );
  }
}




  filter(): void {
    console.log('Search button clicked'); // Log when the button is clicked
    const { year, week } = this.performanceForm.value;
    console.log('Year:', year, 'Month:', week); // Log the values of year and month
    if (year && week) {
      this.performanceService.filterbyyearMonth(year, week).subscribe(
        performanceList => {
          console.log('Filtered performance list:', performanceList); // Log the filtered performance list
          this.performanceList = performanceList;
        },
        error => console.error('Error filtering performance list:', error) // Log any errors that occur during filtering
      );
    } else {
      console.error('Invalid year or month'); // Log an error if year or month is missing
      // Handle invalid input, e.g., show an error message
    }
  }
  

  deletePerformance(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.performanceService.deletePerformance(id).subscribe(
          (response: any) => {
            console.log('Success deleting performance:', response);
            Swal.fire(
              'Deleted!',
              'The performance has been deleted.',
              'success'
            );
            this.loadPerformanceList();
          },
          (error: any) => {
            console.error('Error deleting performance:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the performance.',
              'error'
            );
          }
        );
      }
    });
  }

  resetForm(): void {
    this.performanceForm.reset();
    this.selectedStars = 0;
  }

  selectStars(starCount: number): void {
    this.selectedStars = starCount;
  }

  
 
  startCounting() {
    this.intervalId = setInterval(() => {
    
    }, 50);
  }
 
}

