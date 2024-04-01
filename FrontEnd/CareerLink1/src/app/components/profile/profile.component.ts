import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/Profile';
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

  profile: Profile = new Profile();
  userId!: number;


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

  addProfile(profile: Profile): void {
    this.profileService.addProfile(profile).subscribe(savedProfile => {
      console.log('Profile added successfully:', savedProfile);
      // Rediriger ou afficher un message de succès selon votre besoin
    });
  }




}
