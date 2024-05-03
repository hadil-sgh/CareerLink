import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PerformanceService } from 'src/app/services/performence.service';
import { UserService } from 'src/app/services/user.service';
import { Performance } from 'src/app/models/Performence';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(
    private performanceService: PerformanceService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  performance!: Performance;
  averagePerformanceData: any = null;
  averageImprovementData: any = null;
  @ViewChild('combinedChart') combinedChartRef!: ElementRef;

  ngOnInit(): void {
    this.bestperformance();
    this.fetchCombinedData();
  }

  ngAfterViewInit(): void {
    // Render combined chart after view initialization
    this.renderCombinedChart();
  }

  fetchCombinedData(): void {
    this.performanceService.getAveragePerformance().subscribe(
      averagePerformanceData => {
        this.averagePerformanceData = this.formatChartData(averagePerformanceData, 'Average Performance', '#ff6483');
        this.renderCombinedChart();
      },
      error => console.error('Error fetching average performance:', error)
    );

    this.performanceService.getAverageImprovementInAYear().subscribe(
      averageImprovementData => {
        this.averageImprovementData = this.formatChartData(averageImprovementData, 'Average Improvement', '#36a0ea');
        this.renderCombinedChart();
      },
      error => console.error('Error fetching average improvement:', error)
    );
  }

  formatChartData(data: Map<number, number>, label: string, borderColor: string): any {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const labels = Object.keys(data).map(key => monthNames[parseInt(key) - 1]); // Convert numeric keys to month names

    return {
      labels: labels,
      datasets: [{
        label: label,
        data: Object.values(data),
        borderColor: borderColor,
        fill: false
      }]
    };
  }

  renderCombinedChart(): void {
    if (this.averagePerformanceData && this.averageImprovementData) {
      new Chart(this.combinedChartRef.nativeElement, {
        type: 'line',
        data: {
          labels: this.averagePerformanceData.labels,
          datasets: [
            this.averagePerformanceData.datasets[0],
            this.averageImprovementData.datasets[0]
          ]
        }
      });
    }
  }

  bestperformance(): void {
    this.performanceService.getBestPerformance().subscribe(
      performance => {
        this.performance = performance;
        console.log('best employee:', performance);
      },
      error => console.error('Error fetching best employee:', error)
    );
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
}
