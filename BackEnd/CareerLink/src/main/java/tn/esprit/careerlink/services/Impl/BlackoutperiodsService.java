package tn.esprit.careerlink.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Blackoutperiods;
import tn.esprit.careerlink.entities.TimeOffTracker;
import tn.esprit.careerlink.repositories.IBlackoutperiods;
import tn.esprit.careerlink.repositories.TimeOffTrackerRepository;
import tn.esprit.careerlink.services.IBlackoutperiodsService;

import java.util.Date;
import java.util.List;
@Service
public class BlackoutperiodsService implements IBlackoutperiodsService {

    @Autowired
    private IBlackoutperiods blackoutperiodsRepository;


    @Autowired
    private TimeOffTrackerServiceImpl timeOffTrackerService;


    @Override
    public List<Blackoutperiods> getAllBlackoutperiodss() {
        return blackoutperiodsRepository.findAll();
    }

    @Override
    public void deleteBlackoutperiods(Integer id) {
        blackoutperiodsRepository.deleteById(id);
    }

    @Override
    public Blackoutperiods updatedaysoffbyrole(Blackoutperiods blackoutperiods) {
        return blackoutperiodsRepository.save(blackoutperiods);
    }

    @Override
    public Blackoutperiods addBlackoutperiods(Blackoutperiods blackoutperiods) {
        return blackoutperiodsRepository.save(blackoutperiods);
    }



    public List<Blackoutperiods> getBlackoutPeriodsFromDatabase() {
        return blackoutperiodsRepository.findAll();
    }

    private boolean isDateInRange(Date date, Date start, Date end) {
        return !date.before(start) && !date.after(end);
    }

    public boolean isTimeOffDuringBlackoutPeriod(Integer requestId) {
        TimeOffTracker timeOffRequest = timeOffTrackerService.getOneLeave(requestId);
        if (timeOffRequest == null) {
            return false; // Timeoff request not found
        }

        List<Blackoutperiods> blackoutPeriods = getBlackoutPeriodsFromDatabase();

        for (Blackoutperiods blackoutPeriod : blackoutPeriods) {
            if (isDateInRange(timeOffRequest.getFromDate(), blackoutPeriod.getStart(), blackoutPeriod.getEnd()) ||
                    isDateInRange(timeOffRequest.getToDate(), blackoutPeriod.getStart(), blackoutPeriod.getEnd())) {
                return true; // Found overlapping period
            }
        }

        return false; // No overlapping period found
    }
}
