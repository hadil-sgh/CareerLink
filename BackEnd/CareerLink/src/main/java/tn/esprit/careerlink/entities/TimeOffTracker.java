package tn.esprit.careerlink.entities;
import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(pattern = "dd-MM-yyyy")
    Date fromDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    Date toDate;
    @Enumerated(EnumType.STRING)
    LeaveStatus status;
    @ManyToOne
    User user;

}
