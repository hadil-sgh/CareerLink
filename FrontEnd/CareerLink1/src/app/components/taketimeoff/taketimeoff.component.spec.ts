import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaketimeoffComponent } from './taketimeoff.component';

describe('TaketimeoffComponent', () => {
  let component: TaketimeoffComponent;
  let fixture: ComponentFixture<TaketimeoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaketimeoffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaketimeoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
