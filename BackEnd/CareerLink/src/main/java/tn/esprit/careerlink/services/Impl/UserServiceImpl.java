package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.UserRepository;
import tn.esprit.careerlink.services.IUserService;

import java.util.List;
@AllArgsConstructor
@Service
public class UserServiceImpl implements IUserService {
    final UserRepository userRepository;
    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getOneUser(Integer iduser) {
        return userRepository.findById(iduser).orElse(null);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Integer idUser) {
       userRepository.deleteById(idUser);
    }
}
