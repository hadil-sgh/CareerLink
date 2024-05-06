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
  Year!: number; 
  constructor(private timeofftrackerService: TimeofftrackerService) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.Year = currentYear;

    this.fetchStatistics();
  }

  fetchStatistics(): void {
    this.timeofftrackerService.getLeaveStatistics(this.Year).subscribe(data => {
      this.statistics = new Map(Object.entries(data));
      console.log('stat', data);
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

    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#cdb4db',
            '#ffc8dd',
            '#bde0fe',
            '#90D26D',
            '#d4a373',
            '#e07a5f'
        ],
        hoverOffset: 4
        
        }]
      }
    });
  }
}
