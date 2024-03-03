package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.TimeOffTracker;

import java.util.List;

public interface ITimeOffTrackerService {
    TimeOffTracker addLeave(TimeOffTracker leave);
    TimeOffTracker updateLeave(TimeOffTracker leave);
    TimeOffTracker getOneLeave(Integer idLeave);
    List<TimeOffTracker> getAllLeaves();
    void deleteLeave(Integer idLeave);
}
