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
  reclamationExists: boolean = true; // Variable pour vérifier si la réclamation existe

  ngOnInit(): void {
    this.loadReponses();
    this.loadReclamations();
    // Récupération de l'ID de réclamation depuis l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.reclamationId = parseInt(id, 10); // Assurez-vous que l'ID est bien récupéré sous forme de nombre
        
        // Vérifier si la réclamation existe
        this.reclamationExists = this.Reclamation.some(reclamation => reclamation.idreclamation === this.reclamationId);

        if (this.reclamationExists) {
          this.loadReponses(); // Recharger les réponses si la réclamation existe
        }
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
         Reclamation => this.Reclamation = Reclamation,
        error => console.error('error, getAllReclamations', error)
      );
  }

  generateQrCode(reponse: Reponse): void {
    // Récupérer les informations nécessaires de la réclamation et de la réponse
    const description = reponse.reclamation.description;
    const typeReclamation = reponse.reclamation.typeReclamation;
    const dateReclamation = reponse.reclamation.datereclamation;
    const dateReponse = reponse.datereponse;
    const reponseContent = reponse.reponsecontent;
  
    // Construire le contenu du QR code avec toutes les informations requises
    const qrCodeContent = `
      Type de Réclamation: ${typeReclamation},
      Date de Réclamation: ${dateReclamation},
      Description de Réclamation: ${description},
      Date de Réponse: ${dateReponse},
      Contenu de la Réponse: ${reponseContent}
    `;
  
    // Appeler le service pour générer le QR code avec le contenu construit
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
