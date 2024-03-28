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
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.TimeOffTrackerRepository;
import tn.esprit.careerlink.services.ITimeOffTrackerService;

import java.util.Date;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

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

    @Override
    public List<TimeOffTracker> filterTimeOffByDateAndUser(Date fromDate, Date toDate, User user) {
        List<TimeOffTracker> timeOffList = leaveRepository.findAll();
        return timeOffList.stream()
                .filter(timeOff -> timeOff.getUser().equals(user))
                .filter(timeOff -> isDateInRange(timeOff.getFromDate(), fromDate, toDate))
                .collect(Collectors.toList());
    }

    @Override
    public List<TimeOffTracker> filterTimeOffByUser(User user) {
        return null;
    }

    @Override
    public List<TimeOffTracker> filterTimeOffByDatefromAndUser(Date fromDate, User user) {
        List<TimeOffTracker> timeOffList = leaveRepository.findAll();
        return timeOffList.stream()
                .filter(timeOff -> timeOff.getUser().equals(user))
                .filter(timeOff -> !timeOff.getFromDate().before(fromDate))
                .collect(Collectors.toList());
    }

    @Override
    public List<TimeOffTracker> filterTimeOffByDatetoAndUser(Date toDate, User user) {
        List<TimeOffTracker> timeOffList = leaveRepository.findAll();
        return timeOffList.stream()
                .filter(timeOff -> timeOff.getUser().equals(user))
                .filter(timeOff -> !timeOff.getToDate().after(toDate))
                .collect(Collectors.toList());
    }

    private boolean isDateInRange(Date dateToCheck, Date fromDate, Date toDate) {
        return !dateToCheck.before(fromDate) && !dateToCheck.after(toDate);
    }

}
