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
  averagePerformanceData: any = {
    labels: [],
    datasets: [{
      label: 'Average Performance',
      data: [],
      borderColor: 'blue',
      fill: false
    }]
  };
  averageImprovementData: any = {
    labels: [],
    datasets: [{
      label: 'Average Improvement',
      data: [],
      borderColor: 'green',
      fill: false
    }]
  };
  @ViewChild('averagePerformanceChart') averagePerformanceChartRef!: ElementRef;
  @ViewChild('averageImprovementChart') averageImprovementChartRef!: ElementRef;
  avrageper: Map<number, number> | undefined;
  avrageimp: Map<number, number> | undefined;

  ngOnInit(): void {
    this.bestperformance();
    this.fetchAveragePerformance();
    this.fetchAverageImprovement();
  }

  ngAfterViewInit(): void {
    // Render charts after view initialization
    this.renderCharts();
  }

  renderCharts(): void {
    // Render average performance chart
    if (this.averagePerformanceData) {
      new Chart(this.averagePerformanceChartRef.nativeElement, {
        type: 'line',
        data: this.averagePerformanceData
      });
    }

    // Render average improvement chart
    if (this.averageImprovementData) {
      new Chart(this.averageImprovementChartRef.nativeElement, {
        type: 'line',
        data: this.averageImprovementData
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
  fetchAveragePerformance(): void {
    this.performanceService.getAveragePerformance().subscribe(
      avrageper => {
        this.avrageper = avrageper;
        this.averagePerformanceData.labels = Object.keys(avrageper);
        this.averagePerformanceData.datasets[0].data = Object.values(avrageper);
        console.log('Average Performance Data:', this.averagePerformanceData);
      },
      error => console.error('Error fetching average performance:', error)
    );
  }

  fetchAverageImprovement(): void {
    this.performanceService.getAverageImprovementInAYear().subscribe(
      avrageimp => {
        this.avrageimp = avrageimp;
        this.averageImprovementData.labels = Object.keys(avrageimp);
        this.averageImprovementData.datasets[0].data = Object.values(avrageimp);
        console.log('Average Improvement Data:', this.averageImprovementData);
      },
      error => console.error('Error fetching average improvement:', error)
    );
  }
}
