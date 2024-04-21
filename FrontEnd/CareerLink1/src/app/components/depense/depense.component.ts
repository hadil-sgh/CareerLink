import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/models/Expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { StripeComponent } from '../stripe/stripe.component';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/models/Project';
import { QrcodeService } from 'src/app/services/qrcode.service';
import { StatusPayment } from 'src/app/models/statuspayment';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Reclamation } from 'src/app/models/Reclamation';
import { SharedService } from 'src/app/shared.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {
  email = ''; 
  subject = 'Confirmation de paiement réussi';
  corp = `Cher Utilisateur,\n\nNous sommes ravis de vous informer que votre paiement a été effectué avec succès. Nous vous remercions pour votre transaction.\n\nCordialement,\nL'équipe de CareerLink`;
  @ViewChild('content') content!: ElementRef; // Référence à l'élément contenant le contenu à convertir en PDF

  expenses: Expense[] = [];
  expenseForm!: FormGroup;
  selectedExpense: Expense | null = null;
  stripeComponent: StripeComponent;
  projects: Project[] = [];
  users: User[] = [];
  reclamations: Reclamation[] = [];
  securityCodeVisible = false;
  selectedProjectName: string = '';
  selectedProject: any = null;
  selectedProjectTotalAmount: number = 0;
 


  constructor(
    private qrservice: QrcodeService,
    private expenseService: ExpenseService, 
    private userservice: UserService,
    private fb: FormBuilder,
    private ac: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private reclamationService: ReclamationService,
    private http: HttpClient
  ) {
    this.stripeComponent = new StripeComponent(http, ac, router);
  }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadProjects();
    this.loadUsers(); // Charger les utilisateurs au chargement du composant
    this.loadReclamations();
    this.initializeForm(); // Initialisation du formulaire
  }
  calculateTotalAmount(expenses: Expense[]): number {
    let totalAmount = 0;
  
    // Sum up the amounts of all expenses associated with this project
    expenses.forEach((expense: any) => {
      totalAmount += expense.amount;
    });
  
    return totalAmount;
  }
  calculateRemainingAmount(totalAmount: number): number {
    // Calculez le montant restant à payer en soustrayant le montant déjà payé des dépenses associées
    let totalPaidAmount = this.expenses
      .filter(expense => expense.project?.name === this.selectedProjectName && expense.statusPayment === 'PAYE')
      .reduce((acc, expense) => acc + expense.amount, 0);

    return totalAmount - totalPaidAmount;
  }
  
  
  
 // Ajoutez cette méthode à votre composant DepenseComponent
showProjectDetails(project: any) {
  this.selectedProject = project;

  // Calculer le montant total du projet
  let totalAmount = 0;

  // Parcourir les dépenses associées à ce projet
  this.filterExpensesByProject(project.name).forEach((expense: any) => {
    totalAmount += expense.amount;
  });

  // Assigner le montant total au projet sélectionné
  this.selectedProject.totalAmount = totalAmount;
}


  filterExpensesByProject(projectName: string): Expense[] {
    if (!projectName) {
      return this.expenses; // Si aucun nom de projet n'est spécifié, renvoyer toutes les dépenses
    }
    return this.expenses.filter(expense => expense.project?.name === projectName);
  }

  selectProject(projectName: string) {
    this.selectedProjectName = projectName;
    this.selectedProjectTotalAmount = this.calculateTotalAmount(this.filterExpensesByProject(projectName));
  }
  

  toggleAddReclamationForm(): void {
    this.sharedService.toggleAddReclamationForm();
  }
  toggleSecurityVisibility(): void {
    this.securityCodeVisible = !this.securityCodeVisible;
  }
  loadReclamations(): void {
    this.reclamationService.findAllReclamation()
      .subscribe(
        reclamations => this.reclamations = reclamations,
        error => console.error('Erreur lors du chargement des réclamations :', error)
      );
  }

  hasReclamation(expense: Expense): boolean {
    return this.reclamations.some(reclamation => reclamation.expense.idexpense === expense.idexpense);
  }

  loadUsers(): void {
    this.userservice.findAllUsers()
      .subscribe(
        users => {
          this.users = users;
          console.log('Utilisateurs chargés avec succès :', users);
        },
        error => console.error('Erreur lors du chargement des utilisateurs :', error)
      );
  }

  loadExpenses(): void {
    this.expenseService.findAllExpense()
      .subscribe(
        expenses => this.expenses = expenses,
        error => console.error('Erreur lors du chargement des dépenses :', error)
      );
  }

  loadProjects(): void {
    this.expenseService.getAllProjects()
      .subscribe(
        projects => this.projects = projects,
        error => console.error('Erreur lors du chargement des projets :', error)
      );
  }

  initializeForm(): void {
    // Initialisation du formulaire avec FormBuilder
    this.expenseForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expirationDate: ['', [Validators.required, this.validateExpirationDate]],
      securityCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]{4}$')]]
    });
  }

  validateExpirationDate(control: any) {
    const expirationDate = control.value;
    if (!expirationDate || expirationDate.length !== 7 || expirationDate.indexOf('/') === -1) {
      return { 'invalidExpirationDate': true };
    }
    const [month, year] = expirationDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (isNaN(Number(month)) || isNaN(Number(year)) || Number(month) < 1 || Number(month) > 12 || Number(year) < currentYear || (Number(year) === currentYear && Number(month) < currentMonth)) {
      return { 'invalidExpirationDate': true };
    }
    return null;
  }

  openPaymentModal(expense: Expense): void {
    this.selectedExpense = expense;
    const modal = document.getElementById('paymentModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closePaymentModal(): void {
    const modal = document.getElementById('paymentModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  selectExpense(expense: Expense): void {
    this.selectedExpense = expense;
  }

  payExpense(expense: Expense): void {
    if (expense.statusPayment === 'PAYE') {
      alert("Le paiement a déjà été effectué.");
    } else if (expense.methodPayment === 'CARD') {
      // Paiement par carte
      this.stripeComponent.amount = expense.amount;
      this.stripeComponent.pay();
      this.stripeComponent.paymentSuccessful.subscribe(() => {
        // Mise à jour du statut de paiement
        expense.statusPayment = StatusPayment.PAYE;
        this.expenseService.updateExpense(expense).subscribe(
          () => {
            console.log('Statut de paiement mis à jour avec succès.');
  
            // Envoi d'un e-mail de confirmation
            const associatedUser = this.users.find(user => user.id === expense.user.id);
            if (associatedUser) {
              const userName = associatedUser.firstName;
              const amountPaid = expense.amount;
              const emailBody = `Cher ${userName},\n\nNous sommes ravis de vous informer que votre paiement de ${amountPaid}DT a été effectué avec succès. Nous vous remercions pour votre transaction.\n\nCordialement,\nL'équipe de CareerLink`;
              this.sendEmail(associatedUser.email, this.subject, emailBody);
            } else {
              console.error('Utilisateur associé non trouvé pour l\'expense :', expense);
            }
  
            // Fermer la fenêtre modale après le paiement réussi
            this.closePaymentModal();
          },
          error => {
            console.error('Erreur lors de la mise à jour du statut de paiement : ', error);
            alert("Échec de la mise à jour du statut de paiement.");
          }
        );
      });
    } else if (expense.methodPayment === 'CASH') {
      // Mode de paiement en espèces
      console.log("Vous devez payer en espèces.");
    } else {
      // Mode de paiement non géré
      alert("Mode de paiement non pris en charge.");
    }
  }
  

  sendEmail(userEmail: string, subject: string, body: string): void {
    this.expenseService.sendEmail(userEmail, subject, body).subscribe(
      response => {
        console.log('Email envoyé avec succès :', response);
      },
      error => {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
      }
    );
  }

  tri(): void {
    this.expenseService.tri().subscribe(
      expenses => {
        this.expenses = expenses;
        console.log('Tri effectué avec succès.');
      },
      error => {
        console.error('Erreur lors du tri des dépenses :', error);
      }
    );
  }

  isInvalidControl(controlName: string): boolean {
    const control = this.expenseForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
  formatCardNumber(event: any): void {
    // Get the current value of the card number input
    let cardNumber = event.target.value;

    // Remove any non-digit characters from the input
    cardNumber = cardNumber.replace(/\D/g, '');

    // Add a space after every 4 digits using regex
    cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Update the form control with the formatted card number
    this.expenseForm.patchValue({ cardNumber });
  }
  generatePDF() {
    const data = this.content.nativeElement;

    html2canvas(data).then(canvas => {
      // Récupérer la hauteur et la largeur du canvas
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Dimensions du PDF : portrait, millimètres, format A4
      const position = 0;
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('expenses.pdf'); // Télécharger le PDF avec un nom spécifié
      
    });
  }

}
