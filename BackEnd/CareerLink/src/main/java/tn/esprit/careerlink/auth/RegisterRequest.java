package tn.esprit.careerlink.auth;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import tn.esprit.careerlink.entities.Role;

import java.util.Date;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
  private String firstName;
  private String lastName;
  private Role role;
  private String email;
  private String pwd;
  private boolean mfaEnabled;
  String secret;
}
