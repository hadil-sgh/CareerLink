package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.TimeOffTracker;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.TimeOffTrackerRepository;
import tn.esprit.careerlink.services.ITimeOffTrackerService;

import java.util.List;
@Service
@AllArgsConstructor
public class TimeOffTrackerServiceImpl implements ITimeOffTrackerService {
   private  final TimeOffTrackerRepository leaveRepository;

    @Override
    public TimeOffTracker addLeave(TimeOffTracker leave) {

        return leaveRepository.save(leave);
    }

    @Override
    public TimeOffTracker updateLeave(TimeOffTracker leave) {
        return leaveRepository.save(leave);
    }

    @Override
    public TimeOffTracker getOneLeave(Integer idLeave) {
        return leaveRepository.findById(idLeave).orElse(null);
    }

    @Override
    public List<TimeOffTracker> getAllLeaves() {
        return leaveRepository.findAll();
    }

    @Override
    public void deleteLeave(Integer idLeave) {
        leaveRepository.deleteById(idLeave);
    }
}
