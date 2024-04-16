package tn.esprit.careerlink.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Blackoutperiods;
import tn.esprit.careerlink.repositories.IBlackoutperiods;
import tn.esprit.careerlink.services.IBlackoutperiodsService;

import java.util.List;

@Service
public class BlackoutperiodsService implements IBlackoutperiodsService {
    @Autowired
    IBlackoutperiods BlackoutperiodsRepository;
    @Override
    public List <Blackoutperiods> getAllBlackoutperiodss() {
        return BlackoutperiodsRepository.findAll()  ; }
    @Override
    public Blackoutperiods addBlackoutperiods(Blackoutperiods Blackoutperiods) {
        return BlackoutperiodsRepository.save(Blackoutperiods);
    }
}
