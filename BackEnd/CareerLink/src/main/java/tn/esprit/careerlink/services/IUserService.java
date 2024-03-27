package tn.esprit.careerlink.services;


import org.springframework.security.core.userdetails.UserDetails;
import tn.esprit.careerlink.entities.ChangePasswordRequest;
import tn.esprit.careerlink.entities.User;

import java.security.Principal;
import java.util.List;

public interface IUserService {
    User addUser(User user);
    User updateUser(User user);
    User getOneUser(Integer iduser);
    List<User> getAllUsers();
    void deleteUser(Integer idUser);

   // UserDetails loadUserByUsername(String username);
   void changePassword(ChangePasswordRequest request, Principal connectedUser);


}
