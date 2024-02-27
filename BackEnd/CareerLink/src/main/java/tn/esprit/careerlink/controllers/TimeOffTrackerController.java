package tn.esprit.careerlink.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.services.ITimeOffTrackerService;


import java.util.List;

@RestController
@AllArgsConstructor

@RequestMapping("/TimeOffTracker")

public class TimeOffTrackerController {

     ITimeOffTrackerService timeOffTrackerService;
    @PostMapping("/add")
    public tn.esprit.careerlink.entities.TimeOffTracker addleave(@RequestBody tn.esprit.careerlink.entities.TimeOffTracker Leave){
        return timeOffTrackerService.addLeave(Leave);
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


}