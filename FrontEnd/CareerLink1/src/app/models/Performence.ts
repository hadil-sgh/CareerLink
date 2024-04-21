import { User } from "./User";

export interface Performance {
    idperformence: number;
    grade: number;
    comment: string;
    week: number;
    year: number;
    user: User; // Assurez-vous d'avoir également un modèle User si nécessaire
}
