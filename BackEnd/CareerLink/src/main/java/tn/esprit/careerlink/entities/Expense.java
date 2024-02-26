package tn.esprit.careerlink.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults (level = AccessLevel.PRIVATE)
public class Expense implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idexpense;
    Float amount;
    Date date;
    String category;
    @Enumerated(EnumType.STRING)
    private MethodPayment methodPayment;
    @ManyToOne
    @JsonIgnore
    Stock stock;
    @ManyToOne
    IntegrationProjectCalendar integrationProjectCalendar;
    @OneToOne
    Project project;
    @OneToOne
    Expense_Validation expenseValidation;
    @OneToOne
    Expense_Reimbursement expenseReimbursement;
    @OneToOne
    Reports_Analysis reportsAnalysis;
}
