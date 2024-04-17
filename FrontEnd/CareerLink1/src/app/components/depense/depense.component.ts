import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {
  email = ''; 
  subject = 'Confirmation de paiement réussi';
  corp = `Cher Utilisateur,\n\nNous sommes ravis de vous informer que votre paiement a été effectué avec succès. Nous vous remercions pour votre transaction.\n\nCordialement,\nL'équipe de CareerLink`;
  
  expenses: Expense[] = [];
  expenseForm!: FormGroup;
  selectedExpense: Expense | null = null;
  stripeComponent: StripeComponent;
  projects: Project[] = [];
  users: User[] = [];
  reclamations: Reclamation[] = [];
 
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

  toggleAddReclamationForm(): void {
    this.sharedService.toggleAddReclamationForm();
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
      securityCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]{3}$')]]
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
}
