package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Recruitment;

import java.util.List;

public interface IRecruitmentService {
    Recruitment addRecruitment(Recruitment recruitment);
    Recruitment updateRecruitment(Recruitment recruitment);
    Recruitment getOneRecruitment(Integer idRecruitment);
    List<Recruitment> getAllRecruitments();
    void deleteRecruitment(Integer idRecruitment);
}
