import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswredComponent } from './answred.component';

describe('AnswredComponent', () => {
  let component: AnswredComponent;
  let fixture: ComponentFixture<AnswredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
