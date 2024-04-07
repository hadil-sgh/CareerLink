package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Client;
import tn.esprit.careerlink.entities.Profile;

import java.util.List;

public interface IProfileService {

    Profile addProfile(Profile profile);

    Profile updateProfile(Profile profile);

    Profile getOneProfile(Integer idProfile);

    List<Profile> getAllProfiles();

    void deleteProfile(Integer idProfile);
}
