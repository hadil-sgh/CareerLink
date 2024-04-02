import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/models/Expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { StripeComponent } from '../stripe/stripe.component'; // Importez le composant StripeComponent
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/models/Project';
import { QrcodeService } from 'src/app/services/qrcode.service';
import { Subscription } from 'rxjs';
import { StatusPayment } from 'src/app/models/statuspayment';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {
  email= 'aziz.abidi@esprit.tn'; 
  subject= 'Confirmation de votre payement'; 
  corp= 'Cher Utilisateur,votre payement a ete effectue avec succes '; 
  expenses: Expense[] = [];
  expenseForm!: FormGroup;
  selectedExpense: Expense | null = null;
  stripeComponent: StripeComponent; // Déclarez une variable pour contenir l'instance du composant StripeComponent
  projects: Project[] = [];

  constructor(
    private qrservice: QrcodeService,
    private expenseService: ExpenseService, 
    private fb: FormBuilder,
    private ac: ActivatedRoute,
    private router: Router,
    private http: HttpClient // Injectez HttpClient
    
  ) {
    this.stripeComponent = new StripeComponent(http, ac, router); // Créez une instance de StripeComponent avec les dépendances
  }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadProjects();
  }

  loadExpenses(): void {
    this.expenseService.findAllExpense()
      .subscribe(
        expenses => this.expenses = expenses,
        error => console.error('error, getallExp', error)
      );
  }
  loadProjects(): void {
    this.expenseService.getAllProjects()
      .subscribe(
        projects => this.projects = projects,
        error => console.error('error, getAllProjects', error)
      );
  }

  payExpense(expense: Expense): void {
    if (expense.statusPayment === 'PAYE') {
      alert("Le paiement a déjà été effectué.");
    } else if (expense.methodPayment === 'CARD') {
      this.stripeComponent.amount = expense.amount; // Définissez le montant dans StripeComponent
      this.stripeComponent.pay(); // Appelez la méthode pay() de StripeComponent pour effectuer le paiement
      this.stripeComponent.paymentSuccessful.subscribe(() => {
        // Mettre à jour le statut de paiement ici
        expense.statusPayment = StatusPayment.PAYE;

        // Appeler le service ou la fonction pour mettre à jour l'expense dans la base de données
        this.expenseService.updateExpense(expense).subscribe(
          () => {
            console.log('Statut de paiement mis à jour avec succès.');
            alert("Statut de paiement mis à jour avec succès.");
          },
          error => {
            console.error('Erreur lors de la mise à jour du statut de paiement : ', error);
            alert("failed");
          }
        );
        this.sendEmail(); // Envoyer l'e-mail après la mise à jour du statut de paiement
      });
    } else {
      alert("Vous devez payer en espèces.");
    }
  }
  
  
  
  sendEmail() {
    
  
     
      
    this.expenseService.sendEmail(this.email, this.subject, this.corp).subscribe(
      response => {
        console.log('Email envoyé avec succès :', response);
        // Traitez la réponse de l'API
      },
      error => {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        // Gérez l'erreur
      }
    );
  }
 // depense.component.ts

generateQrCode(expense: Expense): void {
  if (expense.statusPayment === 'PAYE') {
    // Générer le contenu du QR code avec les informations de la dépense
    const qrCodeContent = `Amount: ${expense.amount}, Date: ${expense.dateexpense}, Project: ${expense.project ? expense.project.name : 'N/A'}, Category: ${expense.category}, Method: ${expense.methodPayment}`;

    this.qrservice.generateQrCode(qrCodeContent).subscribe(
      (qrCodeBlob: Blob) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          expense.qrCodeImageUrl = event.target.result;
        };
        reader.readAsDataURL(qrCodeBlob);
      },
      (error) => {
        console.error('Error generating QR code:', error);
        alert('Error generating QR code: ' + error); // Alert error message
      }
    );
  } else {
    alert('Please pay first. Cannot generate QR code.');

  }
}

}


