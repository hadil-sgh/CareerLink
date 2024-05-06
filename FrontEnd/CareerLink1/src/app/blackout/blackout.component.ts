import { Component } from '@angular/core';
import { Blackoutperiods } from '../models/Blackoutperiods';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeofftrackerService } from '../services/timeofftracker.service';

@Component({
  selector: 'app-blackout',
  templateUrl: './blackout.component.html',
  styleUrls: ['./blackout.component.css']
})
export class BlackoutComponent {
  constructor(private blackoutperiodsService: TimeofftrackerService, private fb: FormBuilder) { }
  blackoutperiodsList: Blackoutperiods[] = [];
  blackoutperiodsForm!: FormGroup;
  selectedBlackoutperiod: Blackoutperiods | null = null;

  loadBlackoutperiodsList(): void {
    this.blackoutperiodsService.getAllBlackoutperiods()
      .subscribe(
        blackoutperiodsList => this.blackoutperiodsList = blackoutperiodsList,
        error => console.error('Error fetching blackout periods list:', error)
      );
  }

  ngOnInit(): void {
    this.loadBlackoutperiodsList();
    this.createForm();
  }

  createForm(): void {
    this.blackoutperiodsForm = this.fb.group({
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
    });
  }

  addBlackoutperiod(): void {
    const blackoutperiod = this.blackoutperiodsForm.value as Blackoutperiods;
    this.blackoutperiodsService.addBlackout(blackoutperiod)
      .subscribe(
        response => {
          console.log('Success adding blackout period:', response);
          this.loadBlackoutperiodsList();
        },
        error => console.error('Error adding blackout period:', error)
      );
  }

  cancel(): void {
    this.blackoutperiodsForm.reset();
  }

  editBlackoutperiod(blackoutperiod: Blackoutperiods): void {
    this.selectedBlackoutperiod = blackoutperiod;
    this.blackoutperiodsForm.patchValue({
      start: blackoutperiod.start,
      end: blackoutperiod.end,
    });
  }

  updateBlackoutperiod(): void {
    if (this.selectedBlackoutperiod && this.blackoutperiodsForm.valid) {
      const updatedBlackoutperiod = { ...this.selectedBlackoutperiod, ...this.blackoutperiodsForm.value } as Blackoutperiods;
      this.blackoutperiodsService.updateBlackoutperiods(updatedBlackoutperiod).subscribe(
        response => {
          console.log('Success updating blackout period:', response);
          this.loadBlackoutperiodsList();
          this.blackoutperiodsForm.reset();
          this.selectedBlackoutperiod = null;
        },
        error => console.error('Error updating blackout period:', error)
      );
    }
  }

  deleteBlackoutperiod(id: number): void {
    this.blackoutperiodsService.deleteBlackoutperiods(id).subscribe(
      response => {
        console.log('Success deleting blackout period:', response);
        this.loadBlackoutperiodsList();
      },
      error => console.error('Error deleting blackout period:', error)
    );
  }
}