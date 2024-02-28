import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, ReactiveFormsModule, FormGroup , Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users: User[] = [];
  userForm !: FormGroup;


  
  ngOnInit(): void {
    this.loadUsers;
  }
  

  constructor(private userService: UserService) { }
  loadUsers(): void{
    this.userService.findAllUsers().subscribe( (users :User[]) => {
        this.users = users;
    });
  }

}
