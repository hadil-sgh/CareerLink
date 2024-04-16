import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackoutComponent } from './blackout.component';

describe('BlackoutComponent', () => {
  let component: BlackoutComponent;
  let fixture: ComponentFixture<BlackoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
