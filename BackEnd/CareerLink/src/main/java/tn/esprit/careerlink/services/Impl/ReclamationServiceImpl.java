package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Reclamation;
import tn.esprit.careerlink.repositories.ReclamationRepository;
import tn.esprit.careerlink.services.IReclamationService;
import tn.esprit.careerlink.services.IRecruitmentService;

import java.util.List;
@Service
@Slf4j
@AllArgsConstructor

public class ReclamationServiceImpl implements IReclamationService {
    @Autowired
    ReclamationRepository reclamationRepository;

    @Override
    public Reclamation addReclamation(Reclamation reclamation) {
        return reclamationRepository.save(reclamation);
    }

    @Override
    public Reclamation updateReclamation(Reclamation reclamation) {
        return reclamationRepository.save(reclamation);
    }

    @Override
    public void deleteReclamation(Integer idreclamation) {
        reclamationRepository.deleteById(idreclamation);

    }

    @Override
    public List<Reclamation> getAllReclamation() {
        return reclamationRepository.findAll();
    }

    @Override
    public Reclamation getReclamation(Integer idreclamation) {
        return reclamationRepository.findById(idreclamation).orElse(null);
    }
}
