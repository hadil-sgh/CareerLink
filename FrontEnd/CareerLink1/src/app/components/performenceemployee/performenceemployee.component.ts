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
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < grade ? 'checked' : '');
    }
    return stars;
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
