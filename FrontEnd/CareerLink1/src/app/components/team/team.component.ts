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
    'PROJECT_MANAGEMENT'
    ];
  
  ngOnInit() :void {
    this.loadTeams();
    this.createForm();
   
  }

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
      
        
        name : ['', Validators.required],
        department: ['', Validators.required],
        project: ['', Validators.required],
        users: ['', Validators.required],
        
      });
      console.log(this.teamForm.value +"HELLO1");
  
    
    }
    addTeams(): void {
    
      let team = new Team;
      team = this.teamForm.value;
      console.log("HELLOdfghjklmù");
      team.users=[];


      this.teamService.addTeam(team)
      .subscribe(
        response => {
          console.log('success, add', response);
          console.log(this.teamForm.value +"HELLO");

          this.loadTeams();
        },
        error => console.error('error, add', error)
      );
    } 


    deleteTeam(id :number): void {
      this.teamService.deleteTeam(id).subscribe(
        response => {
          console.log('success, deleteteam', response);
          this.loadTeams();
        },
        error => console.error('error, deleteteam', error)
      )
    }
    updateTeam(): void {
      if (this.selectedTeam && this.teamForm.valid) {
        const updatedteam = { ...this.selectedTeam, ...this.teamForm.value } as Team;
        this.teamService.updateTeam(updatedteam).subscribe(
          response => {
            console.log('success, updateteam', response);
            this.loadTeams();
            this.teamForm.reset();
            this.selectedTeam=null;
          },
          error => console.error('error, updateTeam', error)
        );
      }
    }
    editTeam(team: Team): void {
      this.selectedTeam = team;
      this.teamForm.patchValue({
        TeamName: team.name,
        Department: team.department,
        Project: team.projects
       
       
      });
    }



  }

  






