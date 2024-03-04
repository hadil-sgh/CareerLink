export interface Project {
    id: number;
    name: string;
    description: string;
    dueDate: Date;
    price: number;
    teams: Team[];
    tasks: Task[];
    expense: Expense;
    payments: Payment[];
  }
  
  interface Team {
    // Define Team properties here
  }
  
  interface Task {
    // Define Task properties here
  }
  
  interface Expense {
    // Define Expense properties here
  }
  
  interface Payment {
    // Define Payment properties here
  }