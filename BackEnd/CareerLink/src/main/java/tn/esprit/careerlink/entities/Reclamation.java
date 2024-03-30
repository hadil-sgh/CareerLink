package tn.esprit.careerlink.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Reclamation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idreclamation;
    LocalDate datereclamation;
    String description;
    @Enumerated(EnumType.STRING)
    private StatuReclamation statuReclamation;
    @Enumerated(EnumType.STRING)
    private TypeReclamation typeReclamation;
    @JsonIgnore
    @OneToOne
    Reponse reponse;



}
