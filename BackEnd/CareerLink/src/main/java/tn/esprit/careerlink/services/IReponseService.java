package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Reponse;

import java.util.List;

public interface IReponseService {
    Reponse addReponse (Reponse reponse);
    Reponse updateReponse(Reponse reponse);
    void deleteReponse (Integer idreponse);
    List<Reponse> getAllReponse();
    Reponse getReponse (Integer idreponse);
    Reponse addReponseAndAffect(Integer idreclamartion, Reponse reponse);

}
