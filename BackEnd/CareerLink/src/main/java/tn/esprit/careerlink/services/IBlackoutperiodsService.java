package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Blackoutperiods;

import java.util.List;

public interface IBlackoutperiodsService {
    Blackoutperiods addBlackoutperiods(Blackoutperiods Blackoutperiods);
    List<Blackoutperiods> getAllBlackoutperiodss();
}
