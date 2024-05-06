package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.ChangePasswordRequest;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.UserRepository;
import tn.esprit.careerlink.services.IUserService;

import java.security.Principal;
import java.security.SecureRandom;
import java.util.*;

@AllArgsConstructor
@Service
public class UserServiceImpl implements IUserService {
    final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    final EmailService emailService;


    @Override
    public User addUser(User user) {
        User savedUser = userRepository.save(user);

        // Generate a new activation code for the user
        String activationCode = UUID.randomUUID().toString();
       // savedUser.addToken(activationCode);

        // Send the registration email with the activation code
        emailService.regsend(savedUser.getEmail(), "Welcome to our app!", savedUser, "Registration email", activationCode);

        return savedUser;
    }

    public String generateRandomPassword() {
        // Définir la longueur du mot de passe souhaitée
        int passwordLength = 10; // Vous pouvez ajuster la longueur selon vos besoins

        // Générer un mot de passe aléatoire
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[passwordLength];
        random.nextBytes(bytes);

        // Convertir les octets aléatoires en une chaîne Base64
        return Base64.getEncoder().encodeToString(bytes);
    }

    @Override
    public User updateUser(User updatedUser) {
        Optional<User> existingUserOptional = userRepository.findById(updatedUser.getId());
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setRole(updatedUser.getRole());
            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public User getOneUser(Integer iduser) {
        return userRepository.findById(iduser).orElse(null);
    }

    public User getOneUserbyEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Integer idUser) {
        userRepository.deleteById(idUser);
    }

    @Override
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPwd(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        userRepository.save(user);
    }

    /* @Override
     public UserDetails loadUserByUsername(String username) {
         User user = userRepository.findByLogin(username);
         if (user == null) {
             throw new UsernameNotFoundException("User not found with : " + username);
         }
         return org.springframework.security.core.userdetails.User.builder()
                 .username(user.getLogin())
                 .password(user.getPwd())
                 .roles(user.getRole().toString())
                 .build();
     }*/


}
