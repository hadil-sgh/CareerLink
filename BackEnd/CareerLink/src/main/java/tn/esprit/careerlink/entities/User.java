package tn.esprit.careerlink.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults (level = AccessLevel.PRIVATE)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String firstName;
    String lastName;
    Long phoneNumber;
    String address;
    Date birthday;
    @Enumerated(EnumType.STRING)
    Role role;
    String email;
    String login;
    String pwd;

    @OneToMany (mappedBy = "user")
    Set<Recruitment> recruitments;
    @OneToMany (mappedBy = "user")
    Set<Performence> performenceSet;
    @ManyToMany (mappedBy = "users")
    Set<Event> events;
    @OneToMany(mappedBy = "user")
    Set<Leave> leaves;
    @ManyToMany (mappedBy = "users")
    Set<Team> teams;
    @OneToMany (mappedBy = "user")
    Set<Task> tasks;
    @OneToMany(mappedBy = "user")
    Set<Document> documents;
    @OneToMany
    Set<Message> messages;

}
