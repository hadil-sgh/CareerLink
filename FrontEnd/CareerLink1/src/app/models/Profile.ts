import { User } from "./User";

export interface Profile {
    user:User;
    cin: string;
    tel: string;
    dob: Date;
    address: string;
    skills: string;
    jobHistory: string;
    training: string;
    cv: File;
  }
  