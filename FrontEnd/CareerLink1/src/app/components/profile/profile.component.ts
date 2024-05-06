import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/Profile';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private userService: UserService , private fb: FormBuilder, private router:Router,private route: ActivatedRoute, private profileService: ProfileService) { 
  }

  users: User[] = [];
  selectedUser: User | null = null;

profileForm!:FormGroup;
  profile: Profile = new Profile(); 
  userId!: number;
  // firstName!:String;
  // lastName!:String;
  // email!:String;
  // role!:Role;




  ngOnInit(): void {
    this.userService.findAllUsers()
    .subscribe(
      users => this.users = users,
      error => console.error('error, getall', error)
    );
    this.userId = this.route.snapshot.params['id'];

    this.profileService.getProfile(this.userId).subscribe(profile => {
      this.profile = profile;
    }); 
  }
  
  createForm(): void {
    this.profileForm = this.fb.group({
      // firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      // lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      // role: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
    });
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.profileForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      
    });
  }

  addProfile(profile: Profile): void {
    this.profileService.addProfile(profile).subscribe(savedProfile => {
      console.log('Profile added successfully:', savedProfile);
      // Rediriger ou afficher un message de succès selon votre besoin
    });
  }
  





}
