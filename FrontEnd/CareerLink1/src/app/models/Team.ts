import { Department } from "./Department";
import { Project } from "./Project";
import { User } from "./User";

export class Team{
    id!:number;
    name!:String;
    users!:User[];
    department!:Department;

    projects!: Project;


}