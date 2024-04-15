package tn.esprit.careerlink.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String firstName;
    String lastName;
    Integer cin;
    Long phoneNumber;
    String address;
    Date birthday;
    Date recdate;
    @Enumerated(EnumType.STRING)
    Role role;
    String email;

    @JsonIgnore
    @OneToMany (mappedBy = "user")
    Set<Recruitment> recruitments;
    @JsonIgnore
    @OneToMany (mappedBy = "user" )
    Set<Performance> performenceSet;
    @JsonIgnore
    @ManyToMany (mappedBy = "users")
    Set<Event> events;
    @JsonIgnore
    @OneToMany(mappedBy = "user" )
    Set<TimeOffTracker> leaves;
    @JsonIgnore
    @ManyToMany (mappedBy = "users")
    Set<Team> teams;
    @JsonIgnore
    @OneToMany (mappedBy = "user")
    Set<Task> tasks;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    Set<Document> documents;
    @JsonIgnore
    @OneToMany
    Set<Message> messages;
    @JsonIgnore
    @OneToMany( mappedBy="user")
    Set<Expense> expense;


}
