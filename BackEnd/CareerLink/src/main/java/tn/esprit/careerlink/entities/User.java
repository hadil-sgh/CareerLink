package tn.esprit.careerlink.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults (level = AccessLevel.PRIVATE)
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String firstName;
    String lastName;
    @Enumerated(EnumType.STRING)
    Role role;
    String email;
    String pwd;
    @Column(nullable = true)
    Long score;
    boolean mfaEnabled;
    String secret;

    @JsonIgnore
    @OneToMany (mappedBy = "user",  cascade = CascadeType.ALL)
    Set<Recruitment> recruitments;
    @JsonIgnore
    @OneToMany (mappedBy = "user" , cascade = CascadeType.ALL)
    Set<Performance> performenceSet;
    @JsonIgnore
    @ManyToMany (mappedBy = "users")
    Set<Event> events;
    @JsonIgnore
    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    Set<TimeOffTracker> leaves;
    @JsonIgnore
    @ManyToMany (mappedBy = "users")
    Set<Team> teams;
    @JsonIgnore
    @OneToMany (mappedBy = "user", cascade = CascadeType.ALL)
    Set<Task> tasks;
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    Set<Document> documents;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    Set<Message> messages;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Token> tokens;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    Profile profile;


    @Override
    public List<SimpleGrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return pwd;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
