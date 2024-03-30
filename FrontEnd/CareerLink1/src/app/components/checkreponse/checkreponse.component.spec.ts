import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckreponseComponent } from './checkreponse.component';

describe('CheckreponseComponent', () => {
  let component: CheckreponseComponent;
  let fixture: ComponentFixture<CheckreponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckreponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckreponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
