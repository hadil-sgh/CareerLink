package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.Performance;
import tn.esprit.careerlink.entities.Task;
import tn.esprit.careerlink.entities.Team;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.TeamRepository;
import tn.esprit.careerlink.services.Impl.PerformanceServiceImpl;
import tn.esprit.careerlink.services.Impl.TaskService;
import tn.esprit.careerlink.services.Impl.UserServiceImpl;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static tn.esprit.careerlink.controllers.TimeOffTrackerController.convertToLocalDateViaSqlDate;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/Performance")
public class PerformanceController {
    private  final PerformanceServiceImpl performenceService;
    private  final UserServiceImpl userService;
    private  final TaskService taskService;
    private  final TeamRepository teamRepository;
    @PostMapping("/add")
    public Performance addPerformance(@RequestBody Performance Performance){
        Performance.setYear(Year.now().getValue());
        return performenceService.addPerformence(Performance);
    }
    @PutMapping("/update")
    public Performance updatePerformance(@RequestBody Performance Performance ){
        return performenceService.updatePerformence(Performance);
    }

    @GetMapping("/getOne/{id}")
    public Performance getOnePerformance(@PathVariable ("id")Integer idPerformance){
        return performenceService.getOnePerformence(idPerformance);
    }

    @GetMapping("/getAll")
    public List<Performance> getAllPerformance(){
        return performenceService.getAllPerformences();
    }
    @GetMapping("/getAllbymail/{email}")
    public List<Performance> getAllPerformancebyemail(@PathVariable ("email") String email){

        return performenceService.getAllPerformencesbyid(email);
    }

    @DeleteMapping("/delete/{id}")
    public void  deletePerformance(@PathVariable ("id") Integer idPerformance) {
        performenceService.deletePerformence(idPerformance);    }
    @GetMapping("/tasks/{id}")
    public List<Task> getTasksForUserThisMonth(@PathVariable Integer id) {
        Integer userid =  userService.getOneUser(id).getId();

        LocalDate currentDate = LocalDate.now();
        LocalDate startDate = currentDate.withDayOfMonth(1);
        LocalDate endDate = currentDate.withDayOfMonth(currentDate.lengthOfMonth());

        Date startSqlDate = convertToLocalDateViaSqlDate(startDate);
        Date endSqlDate = convertToLocalDateViaSqlDate(endDate);

        return taskService.getTasksForUserThisMonth(userid, startSqlDate, endSqlDate);
    }

    @GetMapping("/team/{userId}")
    public ResponseEntity<List<String>> findTeamNamesByUser(@PathVariable Integer userId) {
        // Assuming you have a service method to find a user by id
        User user = userService.getOneUser(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<Team> teams = teamRepository.findByUsers(user);
        List<String> teamNames = teams.stream().map(Team::getName).collect(Collectors.toList());
        return ResponseEntity.ok(teamNames);
    }
        @GetMapping("/filter/{year}/{month}")
        public  List<Performance> filterbyyearandmonth(@PathVariable ("year") int year ,@PathVariable ("month") int month){
            return performenceService.getPerformanceByYearAndMonth(year,month);
        }

}
