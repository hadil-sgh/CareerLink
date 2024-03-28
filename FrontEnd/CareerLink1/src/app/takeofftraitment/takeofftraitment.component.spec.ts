import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeofftraitmentComponent } from './takeofftraitment.component';

describe('TakeofftraitmentComponent', () => {
  let component: TakeofftraitmentComponent;
  let fixture: ComponentFixture<TakeofftraitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeofftraitmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeofftraitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
