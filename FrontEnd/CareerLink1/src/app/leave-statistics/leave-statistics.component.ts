import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { TimeofftrackerService } from '../services/timeofftracker.service';

@Component({
  selector: 'app-leave-statistics',
  templateUrl: './leave-statistics.component.html',
  styleUrls: ['./leave-statistics.component.css']
})
export class LeaveStatisticsComponent implements OnInit {
  statistics: Map<string, number> | undefined;
  pieChart: any;
  Year!: number ; // Assign default value to selectedYear

  constructor(private timeofftrackerService: TimeofftrackerService) { }

  ngOnInit(): void {
  }

  fetchStatistics(): void {
    this.timeofftrackerService.getLeaveStatistics(this.Year).subscribe(data => {
      // Convert the object literal into a Map object
      this.statistics = new Map(Object.entries(data));
      console.log('stat',data)
      this.renderPieChart();
    });
  }
  renderPieChart(): void {
    if (!this.statistics || !(this.statistics instanceof Map)) {
      console.error('Statistics data is invalid.');
      return;
    }
  
    const labels = Array.from(this.statistics.keys());
    const data = Array.from(this.statistics.values());
  
    const canvasElement = document.getElementById('pieChart') as HTMLCanvasElement;
  
    // Check if canvas element exists
    if (!canvasElement) {
      console.error('Canvas element not found.');
      return;
    }
  
    const ctx = canvasElement.getContext('2d');
  
    if (!ctx) {
      console.error('Canvas context is null.');
      return;
    }
  
    // Destroy previous chart instance if it exists
    if (this.pieChart) {
      this.pieChart.destroy();
      console.log('Previous chart destroyed successfully');
    }
  
    // Create a new pie chart
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'RGB(32, 133, 236)',
            'RGB(114, 180, 235)',
            'RGB(10, 65, 122)',
            'RGB(132, 100, 160)',
            'RGB(206, 169, 188)',
            'RGB(50, 50, 50)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }
  

  
  
  
  
  
  
}
