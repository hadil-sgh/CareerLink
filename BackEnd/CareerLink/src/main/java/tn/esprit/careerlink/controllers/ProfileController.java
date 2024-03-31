package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.Profile;
import tn.esprit.careerlink.services.Impl.ProfileServiceImpl;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/Profile")
public class ProfileController {
    private final ProfileServiceImpl profileService;


    @PostMapping("/add")
    public Profile addProfile(@RequestBody Profile p){

        return profileService.addProfile(p);
    }
    @PutMapping("/update")
    public Profile updateProfile(@RequestBody Profile p ){

        return profileService.updateProfile(p);
    }

    @GetMapping("/getOne/{id}")
    public Profile getOneProfile(@PathVariable ("id")Integer idProfile){

        return profileService.getOneProfile(idProfile);
    }

    @GetMapping("/getAll")
    public List<Profile> getAllProfiles(){
        return profileService.getAllProfiles();
    }

    @DeleteMapping("/delete/{id}")
    public void  deleteProfile(@PathVariable ("id") Integer idProfile) {
        profileService.deleteProfile(idProfile);
    }
}
