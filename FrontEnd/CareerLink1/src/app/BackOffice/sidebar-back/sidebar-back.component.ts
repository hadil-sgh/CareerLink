import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar-back',
  templateUrl: './sidebar-back.component.html',
  styleUrls: ['./sidebar-back.component.css']
})
export class SidebarBackComponent {
  constructor(private userService:UserService){}

  logout():void{this.userService.logout();}
 
  ngOnInit(){
    
  }
}
