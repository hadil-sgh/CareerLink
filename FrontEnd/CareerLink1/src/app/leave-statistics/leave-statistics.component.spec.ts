import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveStatisticsComponent } from './leave-statistics.component';

describe('LeaveStatisticsComponent', () => {
  let component: LeaveStatisticsComponent;
  let fixture: ComponentFixture<LeaveStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
