import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, ReactiveFormsModule, FormGroup , Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

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
    console.log(this.userForm)
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
        cin: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
        phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
        address: ['', Validators.required],
        birthday: ['', Validators.required],
        recdate: ['', Validators.required],
        role: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
    }
  
    addUser(): void {
      const user = this.userForm.value;
      this.userService.addUser(user)
      .subscribe(
        response => {
          console.log('success, addUser', response);
          this.loadUsers();
          this.userForm.reset();
        },
        error => console.error('error, addUser', error)
      );
    }
     

    editUser(user: User): void {
      this.selectedUser = user;
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        cin:user.cin,
        phoneNumber: user.phoneNumber,
        address:user.address,
        birthday: new Date(user.birthday),
        recdate: new Date(user.recdate),
        role: user.role,
        email: user.email,
        
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

    deleteUser(id: number): void {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(id).subscribe(
            response => {
              console.log('success, deleteUser', response);
              this.loadUsers();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            },
            error => {
              console.error('error, deleteUser', error);
              Swal.fire({
                title: "Error!",
                text: "Failed to delete user.",
                icon: "error"
              });
            }
          );
        }
      });
    }
  
}
