package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Performence;

import java.util.List;

public interface IPerformenceService {
    Performence addPerformence(Performence performence);
    Performence updatePerformence(Performence performence);
    Performence getOnePerformence(Integer idPerformence);
    List<Performence> getAllPerformences();
    void deletePerformence(Integer idPerformence);
}
