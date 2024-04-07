import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { TimeofftrackerService } from '../services/timeofftracker.service';

@Component({
  selector: 'app-leave-statistics',
  templateUrl: './leave-statistics.component.html',
  styleUrls: ['./leave-statistics.component.css']
})
export class LeaveStatisticsComponent implements OnInit {
  statistics: Map<string, number> | undefined;
  pieChart: any;
  selectedYear: number = new Date().getFullYear(); // Assign default value to selectedYear

  constructor(private timeofftrackerService: TimeofftrackerService) { }

  ngOnInit(): void {
    this.fetchStatistics(); // Fetch statistics for default year on component initialization
  }

  fetchStatistics(): void {
    this.timeofftrackerService.getLeaveStatistics(this.selectedYear ?? new Date().getFullYear()).subscribe(data => {
      // Convert the object literal into a Map object
      this.statistics = new Map(Object.entries(data));
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
  
    if (this.pieChart) {
      try {
        this.pieChart.destroy();
        console.log('Previous chart destroyed successfully');
    } catch (error) {
        console.error('Error destroying previous chart:', error);
    }
    }
  
    // Create a new pie chart
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'red',
            'blue',
            'green',
            'yellow',
            'orange',
            'purple'
          ],
          hoverOffset: 4
        }]
      }
    });
}

  
  
  
  
  
  
}
