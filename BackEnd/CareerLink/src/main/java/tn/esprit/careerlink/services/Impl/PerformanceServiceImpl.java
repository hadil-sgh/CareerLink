package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Performance;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.PerformanceRepository;
import tn.esprit.careerlink.services.IPerformanceService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@AllArgsConstructor
@Service
public class PerformanceServiceImpl implements IPerformanceService {
    @Autowired
        PerformanceRepository performanceRepository;
    @Autowired
    UserServiceImpl userService;
    @Override
    public Performance addPerformence(Performance performence) {

        return performanceRepository.save(performence);
    }

    public List<Performance> getPerformancesByUser(User user) {
        return performanceRepository.findByUser(user);
    }

    public double getAverageGradeByEmployee(User employee) {
        List<Performance> performances = performanceRepository.findByUser(employee);
        if (performances.isEmpty()) {
            return 0.0; // Return 0 if no performances found
        }

        int totalGrade = 0;
        for (Performance performance : performances) {
            totalGrade += performance.getGrade();
        }

        return (double) totalGrade / performances.size(); // Calculate average grade
    }

    @Override
    public Performance bestEmplyeeOfThisMonth() {
        List<Performance> PerformancesofthisMonth=new ArrayList<>();
        return null;
    }

    @Override
    public Performance updatePerformence(Performance performence) {
        return performanceRepository.save(performence);
    }

    @Override
    public Performance getOnePerformence(Integer idPerformence) {
        return performanceRepository.findById(idPerformence).orElse(null);
    }

    @Override
    public List<Performance> getAllPerformences() {
        return performanceRepository.findAll();
    }

    @Override
    public List<Performance> getAllPerformencesbyid(String email) {
        int id = userService.getOneUserbyEmail(email).getId();
        List<Performance> list=new ArrayList<>();
        List<Performance> performances=getAllPerformences();
        for (Performance p :performances){
        if (p.getUser().getId().equals(id)){
             list.add(p);
        }
}
        return  list;
    }

    @Override
    public List<Performance> getPerformanceByYearAndMonth(int year, int month) {
        return performanceRepository.findByYearAndMonth(year,month);
    }

    @Override
    public void deletePerformence(Integer idPerformence) {
        performanceRepository.deleteById(idPerformence);
    }

    @Override
    public float getCurrentWeekGradeForUser(Integer userId) {
        LocalDate currentDate = LocalDate.now();
        int currentMonth = currentDate.getMonthValue();
      

        Performance performance = performanceRepository.findByWeekAndUserId(currentMonth, userId);

        if (performance != null) {
            return performance.getGrade();
        } else {
            return 0;
        }
    }






}




