import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeofftrackerService } from 'src/app/services/timeofftracker.service';
import Swal from 'sweetalert2';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-taketimeoff',
  templateUrl: './taketimeoff.component.html',
  styleUrls: ['./taketimeoff.component.css']
})
export class TaketimeoffComponent {
  @ViewChild('fileInput') fileInput!: ElementRef; 
  timeoffForm!: FormGroup;
  selectedFile: File | null = null;
  showPdfForm: boolean = false;

  constructor(private timeoffService: TimeofftrackerService, private formbuilder: FormBuilder, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.timeoffForm = this.formbuilder.group({
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]]
    });
  }

  toggleForm(): void {
    this.showPdfForm = !this.showPdfForm;
    this.timeoffForm.reset();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addTimeOff(): void {
    const newtimeoff = this.timeoffForm.value;
    const formData = new FormData();

    formData.append('type', newtimeoff.type);
    formData.append('description', newtimeoff.description);
    formData.append('fromDate', newtimeoff.fromDate);
    formData.append('toDate', newtimeoff.toDate);

    if (this.selectedFile) {
      formData.append('pdf', this.selectedFile);
    }

    const email = this.getEmailFromToken(); // Get email from token
    this.timeoffService.TakeTiMEOff(formData, email).subscribe(
      response => {  
        console.log('success, add', response);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Request has been submitted",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'swal-center'
          }
        });
      },
      error => console.error('error, add', error)
    );
  }

  getEmailFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.sub; 
    }
    return '';
  }

  cancel(): void {
    this.timeoffForm.reset(); 
    this.closeModal(); 
  }

  closeModal() {
    const modalElement = document.querySelector('.bd-example-modal-lg') as HTMLElement;
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }
  
}
