import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformenceComponent } from './performence.component';

describe('PerformenceComponent', () => {
  let component: PerformenceComponent;
  let fixture: ComponentFixture<PerformenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
