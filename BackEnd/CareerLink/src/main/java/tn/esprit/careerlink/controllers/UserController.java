package tn.esprit.careerlink.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.auth.AuthenticationResponse;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.services.Impl.UserServiceImpl;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "User")
@RequestMapping("/User")

public class UserController {
    private final UserServiceImpl userService;

    @PostMapping("/add")
    public User addUser(@RequestBody User u){
        return userService.addUser(u);
    }

    @PutMapping("/update")
    public User updateUser(@RequestBody User u ){
        return userService.updateUser(u);
    }

    @GetMapping("/getOne/{id}")
    public User getOneUser(@PathVariable("id") Integer idUser){
        return userService.getOneUser(idUser);
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable("id") Integer idUser) {
        userService.deleteUser(idUser);
    }
}
