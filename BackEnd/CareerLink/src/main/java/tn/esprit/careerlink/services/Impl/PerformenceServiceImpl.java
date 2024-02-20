package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Performence;
import tn.esprit.careerlink.repositories.PerformenceRepository;
import tn.esprit.careerlink.services.IPerformenceService;

import java.util.List;
@AllArgsConstructor
@Service
public class PerformenceServiceImpl implements IPerformenceService {
    final PerformenceRepository performenceRepository;
    @Override
    public Performence addPerformence(Performence performence) {
        return performenceRepository.save(performence);
    }

    @Override
    public Performence updatePerformence(Performence performence) {
        return performenceRepository.save(performence);
    }

    @Override
    public Performence getOnePerformence(Integer idPerformence) {
        return performenceRepository.findById(idPerformence).orElse(null);
    }

    @Override
    public List<Performence> getAllPerformences() {
        return performenceRepository.findAll();
    }

    @Override
    public void deletePerformence(Integer idPerformence) {
           performenceRepository.deleteById(idPerformence);
    }
}
