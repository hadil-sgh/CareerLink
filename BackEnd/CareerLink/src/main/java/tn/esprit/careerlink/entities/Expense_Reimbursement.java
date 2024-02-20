package tn.esprit.careerlink.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Expense_Reimbursement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer reimbursement_id;
    @OneToOne (mappedBy ="expenseReimbursement")
    Expense expense;

}
