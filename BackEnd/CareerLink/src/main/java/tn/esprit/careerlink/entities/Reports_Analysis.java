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
public class Reports_Analysis implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer  report_id;
    String comment;
    @ManyToOne
    Expense_Tracking expenseTracking;
    @OneToOne(mappedBy = "reportsAnalysis")
    Expense expense;
}
