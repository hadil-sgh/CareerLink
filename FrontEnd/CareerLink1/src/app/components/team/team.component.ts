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
  
  teams: Team[] = [];
  teamForm!: FormGroup;
  selectedTeam: Team | null = null;
  Department : string[]=[ "MARKETING",
    'SOFTWARE_DEVELOPMENT',
    'IT_OPERATIONS',
    'PROJECT_MANAGEMENT',
    'DATABASE_ADMINISTRATION',
    'CYBERSECURITY',

    'TECHNICAL_SUPPORT', 
    'NETWORK_ADMINISTRATION',
    'DATA_ANALYTICS',
    'IT_TRAINING_AND_DOCUMENTATION',

    'IT_STRATEGY_AND_PLANNING',
    'IT_COMPLIANCE_AND_GOVERNANCE',
    'BUSINESS_INTELLIGENCE'];


    constructor(private teamService :TeamService , private formbilder: FormBuilder) {   

    }
    loadTeams(): void{
      this.teamService.getAllTeam()
      .subscribe(
       teams => this.teams = teams,
        error => console.error('error, getall', error)
      );
    }

  }






