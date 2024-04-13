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
    Float unitPrice;
    Float amount;
    Integer quantity;
    private Date dateexpense;
    String category;



    @Enumerated(EnumType.STRING)
    private MethodPayment methodPayment;
    @Enumerated(EnumType.STRING)
    private StatusPayment statusPayment;


    @ManyToOne

    Project project;
    @JsonIgnore
    @OneToOne
    Reclamation reclamation;
    @ManyToOne
    User user;


}
