package tn.esprit.careerlink.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Daysoffbyrole;
import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.repositories.ExpenseRepository;
import tn.esprit.careerlink.repositories.IDaysoffbyrole;
import tn.esprit.careerlink.services.IDaysoffbyroleService;

import java.util.List;

@Service
public class DaysoffbyroleService implements IDaysoffbyroleService {
    @Autowired
    IDaysoffbyrole daysoffbyroleRepository;
    @Override
    public List <Daysoffbyrole> getAlldaysoffbyroles() {
        return daysoffbyroleRepository.findAll()  ; }
    @Override
    public Daysoffbyrole adddaysoffbyrole(Daysoffbyrole daysoffbyrole) {
        return daysoffbyroleRepository.save(daysoffbyrole);
    }
    @Override
    public Daysoffbyrole updatedaysoffbyrole(Daysoffbyrole daysoffbyrole) {
        return daysoffbyroleRepository.save(daysoffbyrole);
    }

    @Override
    public void deletedaysoffbyrole(Integer id) {
        daysoffbyroleRepository.deleteById(id);
    }
}
