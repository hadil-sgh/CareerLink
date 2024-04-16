package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Blackoutperiods;
import tn.esprit.careerlink.entities.Daysoffbyrole;

import java.util.List;

public interface IBlackoutperiodsService {
    Blackoutperiods addBlackoutperiods(Blackoutperiods Blackoutperiods);
    List<Blackoutperiods> getAllBlackoutperiodss();
    void deleteBlackoutperiods(Integer id);
    public Blackoutperiods updatedaysoffbyrole(Blackoutperiods Blackoutperiods);
}
