package tn.esprit.careerlink.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import tn.esprit.careerlink.config.JwtService;
import tn.esprit.careerlink.entities.*;
import tn.esprit.careerlink.repositories.TokenRepository;
import tn.esprit.careerlink.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  @Value("${application.security.jwt.refresh-token.expiration}")
  private long cookieExpiry;

  public AuthenticationResponse register(RegisterRequest request) {
    Optional<User> existingUserOptional = repository.findByEmail(request.getEmail());
    if (existingUserOptional.isPresent()) {
      User existingUser = existingUserOptional.get();
      if (existingUser.getPwd() != null) {
        throw new RuntimeException("Failed to register user. User already registered with password.");
      }
      existingUser.setPwd(passwordEncoder.encode(request.getPwd()));
      repository.save(existingUser);
    }else {
      throw new RuntimeException("Failed to register user. User does not exist in your database.");
    }
    var user = repository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("Failed to register user."));
    var jwtToken = jwtService.generateToken(user);
    var refreshToken = jwtService.generateRefreshToken(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
  }




  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPwd()
            )
    );

    User user = repository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

    String jwtToken = jwtService.generateToken(user);
    String refreshToken = jwtService.generateRefreshToken(user);

    revokeAllUserTokens(user);

    saveUserToken(user, jwtToken);

//    ResponseCookie cookie = ResponseCookie.from("accessToken", jwtToken)
//            .httpOnly(true)
//            .secure(false)
//            .path("/")
//            .maxAge(cookieExpiry)
//            .build();
//    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .userRole(user.getRole())
            .build();
  }


  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }
}
