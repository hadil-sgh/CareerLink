import { Component } from '@angular/core';
import { PerformanceService } from 'src/app/services/performence.service';
import { Performance } from 'src/app/models/Performence';

@Component({
  selector: 'app-performenceemployee',
  templateUrl: './performenceemployee.component.html',
  styleUrls: ['./performenceemployee.component.css']
})
export class PerformenceemployeeComponent {
  performanceList: Performance[] = [];
  intervalId: any;

  constructor(private performanceService: PerformanceService) { }
  ngOnInit(): void {

    this.loadPerformanceList();
    this.startCounting();

  }
  startCounting() {
    this.intervalId = setInterval(() => {
    
    }, 50);
  }

  getStars(grade: number): string[] {
    console.log('Grade:', grade); // Log the grade value
    const fullStars = Math.floor(grade); // Get the integer part of the grade
    console.log('Full Stars:', fullStars); // Log the number of full stars
    const decimalPart = grade % 1; // Get the decimal part of the grade
    console.log('Decimal Part:', decimalPart); // Log the decimal part
  
    let halfStar = ''; // Initialize halfStar
  
    // Check if the decimal part is greater than or equal to 0.5
    if (decimalPart >= 0.5) {
      halfStar = 'half';
    }
  
    console.log('Half Star:', halfStar); // Log the status of half star
  
    const stars = [];
  
    // Push full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push('checked');
    }
  
    // Push half star if applicable
    if (halfStar !== '') {
      stars.push(halfStar);
    }
  
    console.log('Stars Array:', stars); // Log the final array of stars
  
    // Push remaining empty stars to complete 5 stars
    const totalStars = stars.length;
    for (let i = totalStars; i < 5; i++) {
      stars.push('');
    }
  
    console.log('Final Stars Array:', stars); // Log the final array of stars with empty stars
  
    return stars;
  }

  toggleReadMore(index: number): void {
    this.performanceList[index].expanded = !this.performanceList[index].expanded;
  }
  
  
  
  loadPerformanceList(): void {
    this.performanceService.findPeformancesbysession()
      .subscribe(
        performanceList => {
          performanceList.sort((a, b) => {
            if (a.year !== b.year) {
              return a.year - b.year;
            }
            return a.week - b.week;
          });
          
          this.performanceList = performanceList;
          console.log('Fetched and sorted performance list:', performanceList);
        },
        error => console.error('Error fetching performance list:', error)
      );
  }
  

  isCurrentMonthAndYear(month: number, year: number): boolean {
    const currentDate = new Date();
    return currentDate.getFullYear() === year && currentDate.getMonth() + 1 === month;
  }
  
  
}
