package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Blackoutperiods;
import tn.esprit.careerlink.entities.Daysoffbyrole;

import java.util.List;

public interface IDaysoffbyroleService {

    Daysoffbyrole adddaysoffbyrole(Daysoffbyrole daysoffbyrole);
    List <Daysoffbyrole> getAlldaysoffbyroles();
    void deletedaysoffbyrole(Integer id);
    public Daysoffbyrole updatedaysoffbyrole(Daysoffbyrole daysoffbyrole);
}
