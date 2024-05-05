import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformenceemployeeComponent } from './performenceemployee.component';

describe('PerformenceemployeeComponent', () => {
  let component: PerformenceemployeeComponent;
  let fixture: ComponentFixture<PerformenceemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformenceemployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformenceemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
