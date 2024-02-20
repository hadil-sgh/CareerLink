package tn.esprit.careerlink.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)


public class Expense_Tracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer  tracking_id;
    float  totalAmount;
    @OneToMany(mappedBy="expenseTracking" , cascade = CascadeType.ALL)
     Set<Reports_Analysis> reportsAnalysis;

}
