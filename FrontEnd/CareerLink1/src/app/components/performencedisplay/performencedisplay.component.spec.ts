import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformencedisplayComponent } from './performencedisplay.component';

describe('PerformencedisplayComponent', () => {
  let component: PerformencedisplayComponent;
  let fixture: ComponentFixture<PerformencedisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformencedisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformencedisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
