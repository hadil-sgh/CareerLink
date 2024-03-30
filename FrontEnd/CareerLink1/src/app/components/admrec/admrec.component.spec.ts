import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmrecComponent } from './admrec.component';

describe('AdmrecComponent', () => {
  let component: AdmrecComponent;
  let fixture: ComponentFixture<AdmrecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmrecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
