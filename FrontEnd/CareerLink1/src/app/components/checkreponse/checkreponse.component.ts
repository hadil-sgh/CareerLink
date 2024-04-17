import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reponse } from 'src/app/models/Reponse';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReponseService } from 'src/app/services/reponse.service';
import { QrcodeService } from 'src/app/services/qrcode.service';
import { Reclamation } from 'src/app/models/Reclamation';

@Component({
  selector: 'app-checkreponse',
  templateUrl: './checkreponse.component.html',
  styleUrls: ['./checkreponse.component.css']
})
export class CheckreponseComponent implements OnInit {
  constructor(
    private reponseService: ReponseService,
    private reclamationService: ReclamationService,
    private qrservice: QrcodeService,
    private route: ActivatedRoute
  ) {}

  reponses: Reponse[] = [];
  selectedReponse: Reponse | null = null;

  Reclamation: Reclamation[] = [];
  reclamationId: number | undefined;
  qrCodeImageUrl: string | undefined;

  ngOnInit(): void {
    this.loadReponses();
    this.loadReclamations();
    // Récupération de l'ID de réclamation depuis l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
          this.reclamationId = parseInt(id, 10); // Assurez-vous que l'ID est bien récupéré sous forme de nombre
        
          // Gérer le cas où l'ID n'est pas trouvé dans les paramètres de l'URL
      }
  });
  }

  loadReponses(): void {
    this.reponseService.findAllReponse()
      .subscribe(
        reponses => {
          // Filtrer les réponses par ID de réclamation sélectionné
          this.reponses = reponses.filter(reponse => reponse.reclamation.idreclamation === this.reclamationId);
  
          // Pour chaque réponse filtrée, générer le QR code correspondant
          this.reponses.forEach(reponse => {
            this.generateQrCode(reponse);
          });
        },
        error => console.error('Erreur lors du chargement des réponses :', error)
      );
  }
  
    loadReclamations(): void {
      this.reclamationService.findAllReclamation()
        .subscribe(
           Reclamation => this. Reclamation =  Reclamation,
          error => console.error('error, getAllReclamations', error)
        );
    }

    generateQrCode(reponse: Reponse): void {
      // Construire le contenu du QR code à partir des informations de la réclamation et de la réponse
      const qrCodeContent = `Dear User:${reponse.reclamation.expense.user.firstName}
      Project:${reponse.reclamation.expense.project.name}
      Réclamation: ${reponse.reclamation.description}
      Réponse: ${reponse.reponsecontent}
       DateRéponse:${reponse.datereponse}`;
  
      this.qrservice.generateQrCode(qrCodeContent).subscribe(
        (qrCodeBlob: Blob) => {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            this.qrCodeImageUrl = event.target.result; // Stocker l'URL de l'image du QR code
          };
          reader.readAsDataURL(qrCodeBlob);
        },
        (error) => {
          console.error('Erreur lors de la génération du QR code :', error);
          alert('Erreur lors de la génération du QR code : ' + error);
        }
      );
    }
}
