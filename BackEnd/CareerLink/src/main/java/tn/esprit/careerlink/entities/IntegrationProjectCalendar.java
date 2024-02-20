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
public class IntegrationProjectCalendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer integration_id;
    @OneToMany (mappedBy = "integrationProjectCalendar",cascade = CascadeType.ALL)
    Set<Expense> expenses;
}
