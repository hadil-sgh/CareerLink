import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PerformanceService } from 'src/app/services/performence.service';
import { UserService } from 'src/app/services/user.service';
import { Performance } from 'src/app/models/Performence';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private performanceService: PerformanceService, private fb: FormBuilder,private userServive:UserService) { }
  performance!: Performance ;
  avrageper: Map<number, number> | undefined;
  avrageimp: Map<number, number> | undefined;

  ngOnInit(): void {
    this.bestperformance();
    this.avrageimprovment();
    this.avrageperfrmance();


  }
  getStars(grade: number): string[] {
    const fullStars = Math.floor(grade); 
    const decimalPart = grade % 1; 
  
    let halfStar = ''; 
  
    if (decimalPart >= 0.5) {
      halfStar = 'half';
    }
  
  
    const stars = [];
  
    for (let i = 0; i < fullStars; i++) {
      stars.push('checked');
    }
 
    if (halfStar !== '') {
      stars.push(halfStar);
    }
  

    const totalStars = stars.length;
    for (let i = totalStars; i < 5; i++) {
      stars.push('');
    }
  
  
    return stars;
  }
  bestperformance(): void {
    this.performanceService.getBestPerformance()
        .subscribe(
          performance => {
                this.performance = performance;
                console.log('best employee:', performance);
            },
            error => console.error('Error fetching best employee:', error)
        );
  }
  avrageperfrmance(): void {
    this.performanceService.getAveragePerformance()
        .subscribe(
          avrageper => {
                this.avrageper = avrageper;
                console.log('performance:', avrageper);
            },
            error => console.error('Error fetching best employee:', error)
        );
  }
  avrageimprovment(): void {
    this.performanceService.getAverageImprovementInAYear()
        .subscribe(
          avrageimp => {
                this.avrageimp = avrageimp;
                console.log('improvment', avrageimp);
            },
            error => console.error('Error fetching improvment:', error)
        );
  }
}
