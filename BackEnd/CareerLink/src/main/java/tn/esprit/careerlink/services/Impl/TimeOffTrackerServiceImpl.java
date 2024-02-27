package tn.esprit.careerlink.services.Impl;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.TimeOffTracker;
import tn.esprit.careerlink.repositories.TimeOffTrackerRepository;
import tn.esprit.careerlink.services.ITimeOffTrackerService;

import java.util.List;
@Service
@Component
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TimeOffTrackerServiceImpl implements ITimeOffTrackerService {
    TimeOffTrackerRepository leaveRepository;


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
