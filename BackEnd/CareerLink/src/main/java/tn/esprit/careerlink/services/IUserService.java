package tn.esprit.careerlink.services;


import tn.esprit.careerlink.entities.User;

import java.util.List;

public interface IUserService {
    User addUser(User user);
    User updateUser(User user);
    User getOneUser(Integer iduser);
    List<User> getAllUsers();
    void deleteUser(Integer idUser);

}
