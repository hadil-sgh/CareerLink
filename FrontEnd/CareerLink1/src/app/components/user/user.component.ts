import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, ReactiveFormsModule, FormGroup , Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService , private fb: FormBuilder) { }

  users: User[] = [];
  userForm!: FormGroup;
  selectedUser: User | null = null;
 
 
  ngOnInit(): void {
    this.loadUsers();
    this.createForm();
  }
  

    loadUsers(): void{
    this.userService.findAllUsers()
    .subscribe(
      users => this.users = users,
      error => console.error('error, getall', error)
    );
  }

     createForm(): void {
      this.userForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
        phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
        address: ['', Validators.required],
        birthday: ['', Validators.required],
        role: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        login: ['', Validators.required],
        pwd: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('[a-zA-Z0-9]*')]]
      });
    }
  
    addUser(): void {
      const user = this.userForm.value;
      this.userService.addUser(user)
      .subscribe(
        response => {
          console.log('success, addUser', response);
          this.loadUsers();
        },
        error => console.error('error, addUser', error)
      );
    }
     

    editUser(user: User): void {
      this.selectedUser = user;
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address:user.address,
        birthday: new Date(user.birthday),
        role: user.role,
        email: user.email,
        login: user.login,
        pwd:user.pwd
      });
    }

    updateUser(): void {
      if (this.selectedUser && this.userForm.valid) {
        const updatedUser = { ...this.selectedUser, ...this.userForm.value } as User;
        this.userService.updateUser(updatedUser).subscribe(
          response => {
            console.log('success, updateUser', response);
            this.loadUsers();
            this.userForm.reset();
            this.selectedUser=null;
          },
          error => console.error('error, updateUser', error)
        );
      }
    }

    cancelUpdate(): void {
      this.userForm.reset();
      this.selectedUser=null;
    }

    deleteUser(id :number): void {
      this.userService.deleteUser(id).subscribe(
        response => {
          console.log('success, deleteUser', response);
          this.loadUsers();
        },
        error => console.error('error, deleteUser', error)
      )
    }
  
}
