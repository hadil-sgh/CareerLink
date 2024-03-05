import { Department } from "./Department";
import { Project } from "./Project";
import { User } from "./User";

export class Team{
    id!:number;
    name!:String;
    users!:User[];
    department!:Department;
<<<<<<< HEAD
    projects!: Project;


    


    
    
   
=======
    project!: Project;  
>>>>>>> 75ff48f004f5f573799108eea16980cb4f1d994f
}