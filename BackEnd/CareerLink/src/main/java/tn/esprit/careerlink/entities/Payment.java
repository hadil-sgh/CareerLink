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
public class Payment{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    Float amount;

    @ManyToOne
    Project project;
    @ManyToOne
    Client client;
}
