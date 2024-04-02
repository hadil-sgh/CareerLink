import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {
  clientSecret: string | null = null;
  amount: number = 17667; // Définir la valeur de 'amount' statiquement
  url = "http://localhost:8086/spring2024/stripe";
  
  // Déclaration de l'événement émetteur
  @Output() paymentSuccessful: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient , private ac: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  pay() {
    this.http.post<any>(`${this.url}/stripe/${this.amount}`, {}).subscribe(
      data => {
        this.clientSecret = data;
        // Émettre l'événement de paiement réussi
        this.paymentSuccessful.emit();
        // Afficher une alerte de réussite
        alert("Paiement réussi ! Un email a été envoyé. Veuillez vérifier votre boîte de réception.");
      },
      error => {
        console.error('Une erreur est survenue lors de la requête:', error);
        // Vérifier le type d'erreur retourné par l'API Stripe
        if (error.error && error.error.message) {
          // Afficher le message d'erreur retourné par l'API Stripe
          alert("Erreur lors du paiement: " + error.error.message);
        } else {
          // Afficher une alerte générique en cas d'erreur
          alert("Une erreur est survenue lors du paiement. Veuillez réessayer plus tard.");
        }
      }
    );
  } 
}
