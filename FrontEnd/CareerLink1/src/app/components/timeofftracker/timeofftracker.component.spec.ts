import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeofftrackerComponent } from './timeofftracker.component';

describe('TimeofftrackerComponent', () => {
  let component: TimeofftrackerComponent;
  let fixture: ComponentFixture<TimeofftrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeofftrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeofftrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
