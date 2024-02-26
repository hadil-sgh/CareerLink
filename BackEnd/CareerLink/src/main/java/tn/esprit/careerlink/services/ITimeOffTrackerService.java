package tn.esprit.careerlink.services;

import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.TimeOffTracker;

import java.util.List;
@Service
public interface ITimeOffTrackerService {
    TimeOffTracker addLeave(TimeOffTracker leave);
    TimeOffTracker updateLeave(TimeOffTracker leave);
    TimeOffTracker getOneLeave(Integer idLeave);
    List<TimeOffTracker> getAllLeaves();
    void deleteLeave(Integer idLeave);
}
