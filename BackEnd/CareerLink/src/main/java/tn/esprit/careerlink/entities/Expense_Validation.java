package tn.esprit.careerlink.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Expense_Validation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer validation_id;
    @Enumerated(EnumType.STRING)
    private Statu statu;
    @OneToOne (mappedBy = "expenseValidation")
    Expense expense;



}
