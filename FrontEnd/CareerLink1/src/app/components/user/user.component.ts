import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, ReactiveFormsModule, FormGroup , Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService , private fb: FormBuilder, private router:Router) { 
    }

  users: User[] = [];
  userForm!: FormGroup;
  selectedUser: User | null = null;
  pagedUsers: User[] = []; 
  currentPage: number = 1; 
  pageSize: number = 3;
  totalUsers: number = 0;
  
 
  ngOnInit(): void {
    this.userService.findAllUsers()
    .subscribe(
      users => {
        this.totalUsers = users.length;
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = Math.min(startIndex + this.pageSize, this.totalUsers);
        this.pagedUsers = users.slice(startIndex, endIndex);
      },
      error => console.error('Error while fetching users', error)
    );

    this.createForm();
    this.selectedUser=null;
    console.log(this.userForm)
  }
 

    loadUsers(): void {
      const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = Math.min(startIndex + this.pageSize, this.totalUsers);
  this.userService.findAllUsers().subscribe(
    users => {
      this.pagedUsers = users.slice(startIndex, endIndex);
    },
    error => console.error('Error while fetching users', error)
  );
}

     createForm(): void {
      this.userForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
        role: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
    }
  
   
    addUser(): void {
      const user = this.userForm.value;
      Swal.fire({
        title: 'Confirmation',
        text: 'Do you want to add this user?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.addUser(user).subscribe(
            response => {
              console.log('Success, user added', response);
              this.loadUsers();
              this.userForm.reset();
              Swal.fire('Success', 'User added successfully', 'success');
            },
            error => {
              console.error('Error, failed to add user', error);
              Swal.fire('Error', 'Failed to add user', 'error');
            }
          );
        }
      });
    }
    
    
     

    editUser(user: User): void {
      this.selectedUser = user;
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        
      });
    }

    updateUser(): void {
      
      if (this.selectedUser) {
        const updatedUser = { ...this.selectedUser, ...this.userForm.value } as User;
        updatedUser.id = this.selectedUser.id; 
        Swal.fire({
          title: 'Confirmation',
          text: 'Do you want to update this user?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.updateUser(updatedUser.id,updatedUser).subscribe(
              response => {
                console.log('Success, user updated', response);
                this.loadUsers();
                this.userForm.reset();
                this.selectedUser = null;
                Swal.fire('Success', 'User updated successfully', 'success');
              },
              error => {
                console.error('Error, failed to update user', error);
                Swal.fire('Error', 'Failed to update user', 'error');
              }
            );
          }
        });
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


    goToPreviousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.loadUsers();
  }
}
    
    goToNextPage(): void {
      var totalPages = Math.ceil(this.totalUsers / this.pageSize);
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.loadUsers();
      }
    }
    
    pageChanged(page: number): void {
      this.currentPage = page;
      this.loadUsers();
    }

    
  
}
