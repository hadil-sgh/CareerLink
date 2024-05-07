import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recruitment } from 'src/app/models/Recruitment';
import { User } from 'src/app/models/User';
import { RecruitmentService } from 'src/app/services/recruitment.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent {
  constructor(private recService: RecruitmentService ,private userService:UserService, private fb: FormBuilder, private router:Router, private dialog: MatDialog , private formbilder: FormBuilder, private modalservice: NgbModal) { 
  }

recruitments: Recruitment[] = [];
recruitmentForm!: FormGroup;
importForm!: FormGroup;

selectedRecruitment: Recruitment| null = null;
pagedRecruitments: Recruitment[] = []; 
currentPage: number = 1; 
pageSize: number = 3;
totalrecs: number = 0;
users: User[] = [];
user!:User;
pdfurl = 'url';
id: any;
blob!:Blob;
@ViewChild('content') popupview !: ElementRef;
selectedFile: File | null = null;
selectedExFile: File | null = null;

@ViewChild('fileInput') fileInput!: ElementRef; 




ngOnInit() {
 
    this.userService.findAllUsers()
    .subscribe(
      users => this.users = users,
      error => console.error('error, getall', error)
    );

  this.recService.findAllRecs()
  .subscribe(
    recruitments => {
      this.totalrecs = recruitments.length;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(startIndex + this.pageSize, this.totalrecs);
      this.pagedRecruitments = recruitments.slice(startIndex, endIndex);
    },
    error => console.error('Error while fetching recruitments', error)
  );

  this.createForm();
  this.ImportForm();
  this.selectedRecruitment=null;
}

createForm(): void {
  this.recruitmentForm = this.fb.group({
    fullNameCandidate: ['', Validators.required],
    post: [''],
    interviewDate: [''],
    result: [''],
    cv:[''],
    user: [''],
  });
}

ImportForm(): void {
  this.importForm = this.fb.group({
    file: ['', Validators.required],
    user: [''],
    cv:[''],
  });
}


loadRecs(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;
const endIndex = Math.min(startIndex + this.pageSize, this.totalrecs);
this.recService.findAllRecs().subscribe(
recruitments => {
  this.pagedRecruitments = recruitments.slice(startIndex, endIndex);
},
error => console.error('Error while fetching recruitments', error)
);
}
onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
}

onExFileSelected(event: any): void {
  this.selectedExFile = event.target.files[0];
}




addRecruitment(): void {
  
const recFrom = this.recruitmentForm.value;
  const formData = new FormData();

  formData.append('fullNameCandidate', recFrom.fullNameCandidate);
  formData.append('post', recFrom.post);
  formData.append('interviewDate', recFrom.interviewDate);
  formData.append('result', recFrom.result);
  formData.append('userId', recFrom.user.id); 
  if (this.selectedFile) {
    formData.append('cv', this.selectedFile);
  }

  this.recService.addRecruitment(formData)
    .subscribe(
      (response: any) => {
        console.log('Success adding recruitment:', response);
        this.loadRecs();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "This recruitment has been added successfully",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'swal-center'
          }
        });
        this.recruitmentForm.reset();
      },
      (error: any) => console.error('Error adding recruitment:', error)
    );
}



editRecruitment(recruitment: Recruitment): void {
  this.selectedRecruitment = recruitment;
  this.recruitmentForm.patchValue({
    fullNameCandidate: recruitment.fullNameCandidate,
    post: recruitment.post,
    interviewDate: recruitment.interviewDate,
    result: recruitment.result,
    cv: recruitment.cv,
    user: recruitment.user,
  });
}


updateRecruitment(): void {
  const recFrom = this.recruitmentForm.value;
  const formData = new FormData();

  if (this.selectedRecruitment) { 
    const recruitmentId = this.selectedRecruitment.id;
    
    formData.append('fullNameCandidate', recFrom.fullNameCandidate);
    formData.append('post', recFrom.post);
    formData.append('interviewDate', recFrom.interviewDate);
    formData.append('result', recFrom.result);
    formData.append('userId', recFrom.user.id);
    if (this.selectedFile) {
      formData.append('cv', this.selectedFile);
    }

    this.recService.updateRecruitment(recruitmentId, formData)
      .subscribe(
        (response: any) => {
          console.log('Success updating recruitment:', response);
          this.loadRecs();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Recruitment updated successfully",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'swal-center'
            }
          });
          this.recruitmentForm.reset();
        },
        (error: any) => console.error('Error updating recruitment:', error)
      );
  } else {
    console.error('No recruitment selected.'); // Gérez le cas où aucun recrutement n'est sélectionné
  }
}


cancelUpdate(): void {
  this.recruitmentForm.reset();
  this.selectedRecruitment=null;
}

deleteRecruitment(id: number): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete this recruitment?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.recService.deleteRecruitment(id).subscribe(
        response => {
          console.log('success, deleteRecruitment', response);
          this.loadRecs();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        },
        error => {
          console.error('error, deleteRecruitment', error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete  recruitment.",
            icon: "error"
          });
        }
      );
    }
  });
}

Preview(id: number) {
  this.recService.getCV(id).subscribe(
    (blob: Blob | null) => {
      if (blob !== null && blob.size > 0) {
        console.log('Response from server:', blob);
        let url = window.URL.createObjectURL(blob);
        this.modalservice.open(this.popupview, { size: 'lg' });
        this.pdfurl = url;
      } else {
        // Display an alert when an empty Blob is returned
        this.showEmptyBlobAlert();
      }
    },
    (error: HttpErrorResponse) => {
      console.error('Error fetching PDF:', error);
      if (error.status === 404) {
        console.error('PDF not found.');
      } else {
        console.error('An unexpected error occurred.');
      }
    }
  );
}
showEmptyBlobAlert(): void {
  Swal.fire({
    icon: 'error',
    title: 'Empty PDF',
    text: 'There is no PDF attached to thisThe PDF file is empty or not available',
    confirmButtonText: 'OK'
  });
}


// importRecruitments(): void {
//   const impForm = this.importForm.value;

//   if (!this.selectedFile) {
//     Swal.fire({
//       icon: 'error',
//       title: 'No file selected',
//       text: 'Please select an Excel file to import recruitments',
//       confirmButtonText: 'OK'
//     });
//     return;
//   }

//   const formData = new FormData();
//   formData.append('file', this.selectedFile);
//   formData.append('userId', impForm.user.id);
//   if (this.selectedFile) {
//     formData.append('cv', this.selectedFile);
//   }

//   this.recService.importRecruitments(formData).subscribe(
//     (response) => {
//       console.log('Success importing recruitments:', response);
//       Swal.fire({
//         icon: 'success',
//         title: 'Recruitments imported successfully',
//         confirmButtonText: 'OK'
//       });
//       // Clear the form and selected file after successful import
//       this.importForm.reset();
//       this.selectedFile = null;
//     },
//     (error: HttpErrorResponse) => {
//       console.error('Error importing recruitments:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error importing recruitments',
//         text: 'An error occurred while importing recruitments. Please try again later.',
//         confirmButtonText: 'OK'
//       });
//     }
//   );
// }
importRecruitments(): void {
  const impForm = this.importForm.value;
  if (!this.selectedExFile) {
    Swal.fire({
      icon: 'error',
      title: 'No file selected',
      text: 'Please select an Excel file to import recruitments',
      confirmButtonText: 'OK'
    });
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedExFile);
  formData.append('userId', impForm.user.id);
  if (this.selectedFile) {
    formData.append('cv', this.selectedFile);
  }

  this.recService.importRecruitments(formData).subscribe(
    (response: any) => {
      console.log('Success importing recruitments:', response);
      Swal.fire({
        icon: 'success',
        title: 'Recruitments imported successfully',
        confirmButtonText: 'OK'
      });
      this.importForm.reset();
      this.selectedFile = null;
    },
    (error: HttpErrorResponse) => {
      console.error('Error importing recruitments:', error);
      // Handle the error as plain text instead of JSON
      const errorMessage = error.error || error.message;
      Swal.fire({
        icon: 'error',
        title: 'Error importing recruitments',
        text: errorMessage,
        confirmButtonText: 'OK'
      });
    }
  );
}



//pagination
goToPreviousPage(): void {
if (this.currentPage > 1) {
this.currentPage--;
this.loadRecs();
}
}

goToNextPage(): void {
  var totalPages = Math.ceil(this.totalrecs / this.pageSize);
  if (this.currentPage < totalPages) {
    this.currentPage++;
    this.loadRecs();
  }
}

pageChanged(page: number): void {
  this.currentPage = page;
  this.loadRecs();
}

}
