package tn.esprit.careerlink.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailRequest {
    private String email;
    private String subject;
    private String corp;
}
