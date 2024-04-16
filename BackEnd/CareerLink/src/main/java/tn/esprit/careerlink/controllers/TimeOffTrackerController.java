package tn.esprit.careerlink.controllers;

import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.careerlink.entities.*;
import tn.esprit.careerlink.repositories.TimeOffTrackerRepository;
import tn.esprit.careerlink.repositories.UserRepository;
import tn.esprit.careerlink.services.ITimeOffTrackerService;
import tn.esprit.careerlink.services.IUserService;
import tn.esprit.careerlink.services.Impl.*;

import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/TimeOffTracker")

public class TimeOffTrackerController {

     ITimeOffTrackerService timeOffTrackerService;
     TimeOffTrackerServiceImpl offTrackerService;
     TimeOffTrackerRepository leaveRepository;
     IUserService userService;
    EmailService emailService;
    UserRepository userRepository;
    PerformanceServiceImpl performanceService;
     TaskService taskService;
     BlackoutperiodsService blackoutperiodsService;
     DaysoffbyroleService daysoffbyroleService;
    @PostMapping("/add")
    public TimeOffTracker addLeave(@RequestParam("type") LeaveType leaveType,
                                   @RequestParam("description") String description,
                                   @RequestParam("fromDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date from,
                                   @RequestParam("toDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date to,
                                   @RequestParam("email") String email,
                                   @RequestParam("pdf") MultipartFile file) {
        try {
            TimeOffTracker newtimeoff =new TimeOffTracker();
            newtimeoff.setType(leaveType);

            newtimeoff.setDescription(description);
            newtimeoff.setFromDate(from);
            newtimeoff.setToDate(to);
            newtimeoff.setUser(userRepository.findUserByEmail(email));
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

    @GetMapping("/leave/statistics")
    public Map<String, Double> getLeaveStatistics(@RequestParam("year") int year) {
        return offTrackerService.calculateLeaveStatistics(year);
    }
    @PutMapping("/update/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public TimeOffTracker updateleave(@RequestBody TimeOffTracker lea, @PathVariable int id) {
        TimeOffTracker leave = timeOffTrackerService.getOneLeave(id);
        leave.setType(lea.getType());
        leave.setDescription(lea.getDescription());
        leave.setFromDate(lea.getFromDate());
        leave.setToDate(lea.getToDate());
        return leaveRepository.save(leave);
    }



    @PutMapping("/status/{id}/{newStatus}")
    public ResponseEntity<?> updateStatus(@PathVariable Integer id, @PathVariable LeaveStatus newStatus) {
        try {
            timeOffTrackerService.updateStatus(id, newStatus);
            TimeOffTracker leave = timeOffTrackerService.getOneLeave(id);
            String recipientEmail = leave.getUser().getEmail();
            String firstName = leave.getUser().getFirstName();
            String lastName = leave.getUser().getLastName();

            String subject = "Your time off request status has been updated";

            // Construct map of placeholders and values
            Map<String, String> placeholders = new HashMap<>();
            placeholders.put("USER_FIRST_NAME", firstName + " " + lastName);
            placeholders.put("TIMEOFF_STATUS", newStatus.toString());
            placeholders.put("TIMEOFF_STATUS_CLASS", newStatus == LeaveStatus.Accepted ? "accepted" : "rejected");

            // Send email
            emailService.send(recipientEmail, subject, placeholders);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    @PostMapping("/send-email")
    public ResponseEntity<String> sendTestEmail(@RequestParam String recipientEmail ,
                                               @RequestParam String sub ,
                                               @RequestParam String emailContent ){
        try {
            // Extract email details from the request

            // Call the email sending service
          //  emailService.send(recipientEmail, sub,emailContent);

            return ResponseEntity.ok("Test email sent successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send test email.");
        }
    }
    @GetMapping("/currentWeek")
    public ResponseEntity<Integer> getCurrentWeekGrade(@RequestParam int idle ) {
        int id =  timeOffTrackerService.getOneLeave(idle).getUser().getId();
        Integer grade = performanceService.getCurrentWeekGradeForUser(id);
        if (grade != null) {
            return new ResponseEntity<>(grade, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getOne/{id}")
    public tn.esprit.careerlink.entities.TimeOffTracker getOneleave(@PathVariable ("id")Integer idLeave){
        return timeOffTrackerService.getOneLeave(idLeave);
    }

    @GetMapping("/getAll")
    public List<tn.esprit.careerlink.entities.TimeOffTracker> getAllleave(){
        return timeOffTrackerService.getAllLeaves();
    }
    @GetMapping("/getbyuser")
    public List<tn.esprit.careerlink.entities.TimeOffTracker> getbyuser(String email){
        return timeOffTrackerService.getAllbyuser(email);
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
        String fileCode = timeOffTrackerService.getOneLeave(id).getPdfData();
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

        // Set the appropriate content type for PDF files
        String contentType = "application/pdf";

        // Instead of forcing download, set content disposition to inline
        String headerValue = "inline; filename=\"" + resource.getFilename() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }

    @GetMapping("/tasks/{id}")
    public List<Task> getTasksForUserThisMonth(@PathVariable Integer id) {
        Integer userid =  timeOffTrackerService.getOneLeave(id).getUser().getId();

        LocalDate currentDate = LocalDate.now();
        LocalDate startDate = currentDate.withDayOfMonth(1);
        LocalDate endDate = currentDate.withDayOfMonth(currentDate.lengthOfMonth());

        Date startSqlDate = convertToLocalDateViaSqlDate(startDate);
        Date endSqlDate = convertToLocalDateViaSqlDate(endDate);

        return taskService.getTasksForUserThisMonth(userid, startSqlDate, endSqlDate);
    }

    @PostMapping("/adddaysoff")
    public Daysoffbyrole addDaysoffbyrole(@RequestBody Daysoffbyrole daysoffbyrole){
        return daysoffbyroleService.adddaysoffbyrole(daysoffbyrole);
    }
    @PutMapping("/updatedayoff")
    public Daysoffbyrole updatedayoff(@RequestBody Daysoffbyrole expense){
        return daysoffbyroleService.updatedaysoffbyrole(expense);
    }
    @DeleteMapping("/deletedayoff/{id}")
    public void deletedayoff(@PathVariable ("id")Integer id) {
        daysoffbyroleService.deletedaysoffbyrole(id);
    }
    @GetMapping("/getAlldayoff")
    public List<Daysoffbyrole> getAlldayoff(){
        return daysoffbyroleService.getAlldaysoffbyroles();
    }
    @GetMapping("/getroledayoff/{id}")
    public int getroledayoff(@PathVariable ("id")Integer id){
        Role role =  timeOffTrackerService.getOneLeave(id).getUser().getRole();
       List<Daysoffbyrole> list= daysoffbyroleService.getAlldaysoffbyroles();
       for (Daysoffbyrole r:list){
              Role rolel=r.getRole();
              if(role.equals(rolel)){
                  return r.getDaysoff();
              }
       }

        return 0;
    }
    @PostMapping("/addblackout")
    public Blackoutperiods addBlackoutperiods(@RequestBody Blackoutperiods blackoutperiods){
        return blackoutperiodsService.addBlackoutperiods(blackoutperiods);
    }
    @PutMapping("/updatBlackoutperiods")
    public Blackoutperiods updateBlackoutperiods(@RequestBody Blackoutperiods blackoutperiods){
      return blackoutperiodsService.updatedaysoffbyrole(blackoutperiods);
    }
    @DeleteMapping("/deleteBlackoutperiods/{id}")
    public void deleteBlackoutperiods(@PathVariable ("id")Integer id){
         blackoutperiodsService.deleteBlackoutperiods(id);
    }
    @GetMapping("/getAllBlackoutperiods")
    public List<Blackoutperiods> getAllBlackoutperiods(){
        return blackoutperiodsService.getAllBlackoutperiodss();
    }

    @GetMapping("/total/{id}")
    public ResponseEntity<Long> getTotalTimeOff(@PathVariable Integer id) {

        User user = timeOffTrackerService.getOneLeave(id).getUser();

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        long totalTimeOff = timeOffTrackerService.calculateTotalTimeOff(user);
       long daysoffbyrole = getroledayoff(id);
        long returnvalue =daysoffbyrole-totalTimeOff;
        return new ResponseEntity<>(returnvalue, HttpStatus.OK);
    }
    public static Date convertToLocalDateViaSqlDate(LocalDate dateToConvert) {
        return java.sql.Date.valueOf(dateToConvert);
    }
}



