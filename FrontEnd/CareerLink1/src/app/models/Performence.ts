import { User } from "./User";

export interface Performance {
    gradePunctuality: number;
    gradeDiscipline: number;
    gradeTeamWork: number;
    idperformence: number;
    grade: number;
    comment: string;
    week: number;
    year: number;
    user: User; 
    expanded?: boolean;
}
