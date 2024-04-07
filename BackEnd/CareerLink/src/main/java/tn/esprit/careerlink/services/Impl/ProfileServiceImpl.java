package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Profile;
import tn.esprit.careerlink.repositories.ProfileRepository;
import tn.esprit.careerlink.services.IProfileService;

import java.util.List;
@Service
@Slf4j
@AllArgsConstructor
public class ProfileServiceImpl implements IProfileService {

    final ProfileRepository profileRepository;
    @Override
    public Profile addProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    @Override
    public Profile updateProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    @Override
    public Profile getOneProfile(Integer idProfile) {
        return profileRepository.findById(idProfile).orElse(null);
    }

    @Override
    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    @Override
    public void deleteProfile(Integer idProfile) {
        profileRepository.deleteById(idProfile);
    }
}
