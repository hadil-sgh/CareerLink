package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Performance;
import tn.esprit.careerlink.repositories.PerformanceRepository;
import tn.esprit.careerlink.services.IPerformanceService;

import java.util.List;
@AllArgsConstructor
@Service
public class PerformanceServiceImpl implements IPerformanceService {
    final PerformanceRepository performanceRepository;
    @Override
    public Performance addPerformence(Performance performence) {
        return performanceRepository.save(performence);
    }

    @Override
    public Performance updatePerformence(Performance performence) {
        return performanceRepository.save(performence);
    }

    @Override
    public Performance getOnePerformence(Integer idPerformence) {
        return performanceRepository.findById(idPerformence).orElse(null);
    }

    @Override
    public List<Performance> getAllPerformences() {
        return performanceRepository.findAll();
    }

    @Override
    public void deletePerformence(Integer idPerformence) {
        performanceRepository.deleteById(idPerformence);
    }
}
