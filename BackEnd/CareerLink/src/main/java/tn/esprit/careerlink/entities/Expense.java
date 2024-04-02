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
    private String qrCodeData;
    private String qrCodeImageUrl;

    @Enumerated(EnumType.STRING)
    private MethodPayment methodPayment;


    @ManyToOne

    Project project;
    @JsonIgnore
    @OneToOne
    Reclamation reclamation;



}
