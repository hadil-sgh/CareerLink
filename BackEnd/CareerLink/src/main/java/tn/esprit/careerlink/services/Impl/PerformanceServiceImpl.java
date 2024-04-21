package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Performance;
import tn.esprit.careerlink.repositories.PerformanceRepository;
import tn.esprit.careerlink.services.IPerformanceService;

import java.time.LocalDate;
import java.time.Year;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.List;
@AllArgsConstructor
@Service
public class PerformanceServiceImpl implements IPerformanceService {
    @Autowired
        PerformanceRepository performanceRepository;
    @Override
    public Performance addPerformence(Performance performence) {

        return performanceRepository.save(performence);
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
    public void deletePerformence(Integer idPerformence) {
        performanceRepository.deleteById(idPerformence);
    }

    @Override
    public Integer getCurrentWeekGradeForUser(Integer userId) {

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




