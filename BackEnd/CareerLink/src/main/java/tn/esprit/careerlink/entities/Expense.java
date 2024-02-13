package tn.esprit.careerlink.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults (level = AccessLevel.PRIVATE)
public class Expense{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    Float amount;
    @OneToOne
    Project project;
}
