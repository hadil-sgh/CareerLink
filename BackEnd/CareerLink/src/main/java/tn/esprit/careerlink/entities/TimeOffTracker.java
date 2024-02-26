package tn.esprit.careerlink.entities;
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
public class TimeOffTracker implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Enumerated(EnumType.STRING)
    LeaveType type;
    String description;
    Date fromDate;
    Date toDate;
    @Enumerated(EnumType.STRING)
    LeaveStatus status;
    @ManyToOne
    User user;

}
