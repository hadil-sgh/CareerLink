import { User } from "./User";

export interface Recruitment{
  id: number;
  fullNameCandidate : string;
  post: string;
  interviewDate: Date;
  result: string;
  cv: File;
  user: User;
}