import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PerformanceService } from 'src/app/services/performence.service';
import { Performance } from 'src/app/models/Performence';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Task2 } from 'src/app/models/Task2';
import { Status } from 'src/app/models/Status';
import Swal from 'sweetalert2';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-performence',
  templateUrl: './performence.component.html',
  styleUrls: ['./performence.component.css']
})
export class PerformenceComponent implements OnInit {
  userFormControl: any;
  constructor(private performanceService: PerformanceService, private fb: FormBuilder,private userServive:UserService) { }
  
  performanceList: Performance[] = [];
  users: User[] = [];
  tasks: Task2[] = [];
  teamNames:any;
  performanceForm!: FormGroup;
  selectedPerformance: Performance | null = null;
  selectedStarsTeamWork: number = 0;
  selectedStarsDiscipline: number = 0;
  selectedStarsPunctuality: number = 0;
  searchText: string = ''; 

  ngOnInit(): void {
    this.loadPerformanceList();
    this.createForm();
    this.loadusers();
    this.loadteamname();
    this.loadTasks(); 
    
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

    return imagePath;
  }

  loadteamname(): void {
    this.performanceForm.get('user')?.valueChanges.subscribe((selectedUser: User) => {
      if (selectedUser) { 
        this.performanceService.getTeamNamesByUser(selectedUser.id).subscribe(
          teamNames => {
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
      grade: [null], // Will be calculated dynamically
      comment: [''],
      week: [''],
      user: [''],
    });

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
    
    // Calculate average grade
    const averageGrade = (this.selectedStarsTeamWork + this.selectedStarsDiscipline + this.selectedStarsPunctuality) / 3;
    performance.grade = averageGrade;

    performance.idperformence = 0; // Set idperformence to 0
    // Extracting only the user id
    performance.user = { id: performance.user.id } as User;

    this.performanceService.addPerformance(performance)
        .subscribe(
            (response: any) => {
                console.log('Success adding performance:', response);
                this.loadPerformanceList();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "this performance has been submitted",
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    popup: 'swal-center'
                  }
                });
                this.resetForm();
            },
            (error: any) => console.error('Error adding performance:', error)
        );
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
    this.selectedStarsTeamWork = 0;
    this.selectedStarsDiscipline = 0;
    this.selectedStarsPunctuality = 0;
  }

  selectStars(starCount: number, category: string): void {
    switch (category) {
      case 'teamWork':
        this.selectedStarsTeamWork = starCount;
        break;
      case 'discipline':
        this.selectedStarsDiscipline = starCount;
        break;
      case 'punctuality':
        this.selectedStarsPunctuality = starCount;
        break;
    }
  }
}
