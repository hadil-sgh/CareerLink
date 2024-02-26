package tn.esprit.careerlink.entities;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults (level = AccessLevel.PRIVATE)
public class Project implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String name;
    String description;
    Date dueDate;
    Float price;
    @ManyToMany (mappedBy = "projects")
    Set<Team> teams;
    @OneToMany
    Set<Task> tasks;
    @OneToOne (mappedBy = "project")
    Expense expense;
    @OneToMany (mappedBy = "project")
    Set<Payment> payments;


}
