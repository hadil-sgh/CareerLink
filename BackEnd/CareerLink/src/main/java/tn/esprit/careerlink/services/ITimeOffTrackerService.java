package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.LeaveStatus;
import tn.esprit.careerlink.entities.TimeOffTracker;
import tn.esprit.careerlink.entities.User;

import java.util.Date;
import java.util.List;

public interface ITimeOffTrackerService {
    TimeOffTracker addLeave(TimeOffTracker leave);
    TimeOffTracker updateLeave(int id,TimeOffTracker leave);
     void updateStatus(Integer id, LeaveStatus newStatus) ;

        TimeOffTracker getOneLeave(Integer idLeave);
    List<TimeOffTracker> getAllLeaves();
    void deleteLeave(Integer idLeave);
    List <TimeOffTracker> filterTimeOffByDateAndUser (Date fromDate, Date toDate, User user);
    List <TimeOffTracker> filterTimeOffByUser ( User user);
    List <TimeOffTracker> filterTimeOffByDatefromAndUser (Date fromDate, User user);
    List <TimeOffTracker> filterTimeOffByDatetoAndUser (Date toDate, User user);
    List<TimeOffTracker> getAllbyuser(String email) ;


    }
