package tn.esprit.careerlink.controllers;

import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.LeaveStatus;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.services.ITimeOffTrackerService;
import tn.esprit.careerlink.services.IUserService;


import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/TimeOffTracker")

public class TimeOffTrackerController {

     ITimeOffTrackerService timeOffTrackerService;
     IUserService userService;
    @PostMapping("/add")
    public tn.esprit.careerlink.entities.TimeOffTracker addleave(@RequestBody tn.esprit.careerlink.entities.TimeOffTracker leave){
        leave.setStatus(LeaveStatus.valueOf("Pending"));
        return timeOffTrackerService.addLeave(leave);
    }
    @PutMapping("/update")
    public tn.esprit.careerlink.entities.TimeOffTracker updateleave(@RequestBody tn.esprit.careerlink.entities.TimeOffTracker Leave ){
        return timeOffTrackerService.updateLeave(Leave);
    }

    @GetMapping("/getOne/{id}")
    public tn.esprit.careerlink.entities.TimeOffTracker getOneleave(@PathVariable ("id")Integer idLeave){
        return timeOffTrackerService.getOneLeave(idLeave);
    }

    @GetMapping("/getAll")
    public List<tn.esprit.careerlink.entities.TimeOffTracker> getAllleave(){
        return timeOffTrackerService.getAllLeaves();
    }

    @DeleteMapping("/delete/{id}")
    public void  deleteleave(@PathVariable ("id") Integer idLeave) {
        timeOffTrackerService.deleteLeave(idLeave);    }


    @GetMapping("/filter")
    public List<tn.esprit.careerlink.entities.TimeOffTracker> filterTimeOffByDateAndUser(
          //  helps Spring understand the expected date format and converts the string representation to a Date object.
            @RequestParam(name = "fromDate" , required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date fromDate,
            @RequestParam(name = "toDate", required = false ) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date toDate,
            @RequestParam(name = "userId" , required = false) Integer userId) {

        User user = userService.getOneUser(userId);

        if (fromDate != null && toDate != null) {
            return timeOffTrackerService.filterTimeOffByDateAndUser(fromDate, toDate, user);
        } else if (fromDate != null) {

           return timeOffTrackerService.filterTimeOffByDatefromAndUser(fromDate, user);
        } else if (toDate != null) {
            // Logic for filtering by toDate only
            return timeOffTrackerService.filterTimeOffByDatetoAndUser(toDate, user);
        } else {
            // Handle the case where neither fromDate nor toDate is provided
           return timeOffTrackerService.filterTimeOffByUser(user);
        }
    }
    }

