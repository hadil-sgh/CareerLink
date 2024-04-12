package tn.esprit.careerlink.services.Impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.LeaveStatus;
import tn.esprit.careerlink.entities.LeaveType;
import tn.esprit.careerlink.entities.TimeOffTracker;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.TimeOffTrackerRepository;
import tn.esprit.careerlink.repositories.UserRepository;
import tn.esprit.careerlink.services.ITimeOffTrackerService;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Component
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TimeOffTrackerServiceImpl implements ITimeOffTrackerService {
    TimeOffTrackerRepository leaveRepository;
    UserRepository userRepository;


    @Override
    public TimeOffTracker addLeave(TimeOffTracker leave) {

        return leaveRepository.save(leave);
    }

    @Override
    public TimeOffTracker updateLeave(int id ,TimeOffTracker leave) {
        return leaveRepository.save(leave);
    }

    @Override
    public void updateStatus(Integer id, LeaveStatus newStatus) {
        Optional<TimeOffTracker> optionalTimeOffTracker = leaveRepository.findById(id);
        if (optionalTimeOffTracker.isPresent()) {
            TimeOffTracker timeOffTracker = optionalTimeOffTracker.get();
            timeOffTracker.setStatus(newStatus);
            leaveRepository.save(timeOffTracker);
        } else {
            // Handle entity not found
            throw new EntityNotFoundException("TimeOffTracker with id " + id + " not found");
        }
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
    public List<TimeOffTracker> getAllbyuser(String email) {
        List<TimeOffTracker> leave= leaveRepository.findAll();
        List<TimeOffTracker> timeOffTrackerspersession= new ArrayList<>();
     for ( TimeOffTracker l :leave){
        if (l.getUser().getEmail().matches(email)){
          timeOffTrackerspersession.add(l);
        }
     }
    return timeOffTrackerspersession;
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
    public Map<String, Double> calculateLeaveStatistics(int year) {
        Calendar fromCalendar = new GregorianCalendar(year, Calendar.JANUARY, 1);
        Calendar toCalendar = new GregorianCalendar(year, Calendar.DECEMBER, 31);

        List<TimeOffTracker> leaveRecords = leaveRepository.findByDateRange(fromCalendar.getTime(), toCalendar.getTime());
        return calculatePercentageByLeaveType(leaveRecords);
    }

    private Map<String, Double> calculatePercentageByLeaveType(List<TimeOffTracker> leaveRecords) {
        Map<String, Double> statistics = new HashMap<>();
        int totalRecords = leaveRecords.size();

        Map<LeaveType, Long> countByLeaveType = leaveRecords.stream()
                .collect(Collectors.groupingBy(TimeOffTracker::getType, Collectors.counting()));

        for (LeaveType leaveType : LeaveType.values()) {
            long count = countByLeaveType.getOrDefault(leaveType, 0L);
            double percentage = (count / (double) totalRecords) * 100;
            statistics.put(leaveType.toString(), percentage);
        }

        return statistics;
    }

}
