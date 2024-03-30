package tn.esprit.careerlink.controllers;

import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.careerlink.entities.*;
import tn.esprit.careerlink.repositories.TimeOffTrackerRepository;
import tn.esprit.careerlink.services.ITimeOffTrackerService;
import tn.esprit.careerlink.services.IUserService;
import tn.esprit.careerlink.services.Impl.FileStorage;
import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.careerlink.services.Impl.TimeOffTrackerServiceImpl;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/TimeOffTracker")

public class TimeOffTrackerController {

     ITimeOffTrackerService timeOffTrackerService;
     TimeOffTrackerRepository leaveRepository;
     IUserService userService;
    @PostMapping("/add")
    public TimeOffTracker addLeave(@RequestParam("leaveType") LeaveType leaveType,
                                   @RequestParam("description") String description,
                                   @RequestParam("from") @DateTimeFormat(pattern="yyyy-MM-dd") Date from,
                                   @RequestParam("from") @DateTimeFormat(pattern="yyyy-MM-dd") Date to,
                                   @RequestParam("user") User user,
                                   @RequestParam("file") MultipartFile file) {
        try {
            TimeOffTracker newtimeoff =new TimeOffTracker();
            newtimeoff.setType(leaveType);

            newtimeoff.setDescription(description);
            newtimeoff.setFromDate(from);
            newtimeoff.setToDate(to);
            newtimeoff.setUser(user);
            if (file != null && !file.isEmpty()) {
                String original = FileStorage.saveFile(StringUtils.cleanPath(file.getOriginalFilename()),file);
                newtimeoff.setPdfData(original);
            }
            newtimeoff.setStatus(LeaveStatus.Pending);

            return leaveRepository.save(newtimeoff);        }
        catch (IOException e) {
            e.printStackTrace(); // Handle exception appropriately
            return null; // Or throw an exception
        }
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
    @GetMapping("/downloadFile/{id}")
    public ResponseEntity<?> downloadFile(@PathVariable("id") Integer id) {
        String fileCode=  timeOffTrackerService.getOneLeave(id).getPdfData();
        FileDownloadUtil downloadUtil = new FileDownloadUtil();

        Resource resource = null;
        try {
            resource = downloadUtil.getFileAsResource(fileCode);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }

        if (resource == null) {
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        }

        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }

    }

