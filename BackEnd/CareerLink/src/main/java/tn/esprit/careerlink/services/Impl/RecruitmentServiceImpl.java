package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Recruitment;
import tn.esprit.careerlink.repositories.RecruitmentRepository;
import tn.esprit.careerlink.services.IRecruitmentService;

import java.util.List;
@AllArgsConstructor
@Service
public class RecruitmentServiceImpl implements IRecruitmentService {
   final RecruitmentRepository recruitmentRepository;
    @Override
    public Recruitment addRecruitment(Recruitment recruitment) {
        return recruitmentRepository.save(recruitment);
    }

    @Override
    public Recruitment updateRecruitment(Recruitment recruitment) {
        return recruitmentRepository.save(recruitment);
    }

    @Override
    public Recruitment getOneRecruitment(Integer idRecruitment) {
        return recruitmentRepository.findById(idRecruitment).orElse(null);
    }

    @Override
    public List<Recruitment> getAllRecruitments() {
        return recruitmentRepository.findAll();
    }

    @Override
    public void deleteRecruitment(Integer idRecruitment) {
        recruitmentRepository.deleteById(idRecruitment);
    }
}
