import { Component } from '@angular/core';
import { Team } from 'src/app/models/Team';
import { TeamService} from 'src/app/services/team.service';
import { FormBuilder, ReactiveFormsModule, FormGroup , Validators, FormControl } from '@angular/forms';
import { Department } from 'src/app/models/Department';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  
  ngOnInit() :void {
    this.loadTeams();
    this.createForm();
    
   
    
   
  }



  teams: Team[] = [];
  teamForm!: FormGroup;
  selectedTeam: Team | null = null;
  Department : string[]=[ "MARKETING",
    'SOFTWARE_DEVELOPMENT',
    'IT_OPERATIONS',
    'PROJECT_MANAGEMENT'
    ];


    constructor(private teamService :TeamService , private formbilder: FormBuilder) {   

    }
    loadTeams(): void {
      this.teamService.getAllTeam()
        .subscribe(
          teams => {
            this.teams = teams;
            console.log('Teams:', teams); 
          },
          error => console.error('Error while fetching teams:', error)
        );
    }
    createForm() :void{
      this.teamForm = this.formbilder.group({
      
        
        teamname : ['', Validators.required],
        Department: ['', Validators.required],
        Project: ['', Validators.required],
        user: ['', Validators.required],
        
      });

  
    
    }
    addTeams(): void {
    
      const newteam = this.teamForm.value;
     
  
      this.teamService.addTeam(newteam)
      .subscribe(
        response => {
          console.log('success, add', response);
          this.loadTeams();
        },
        error => console.error('error, add', error)
      );
    } 
  }

  






