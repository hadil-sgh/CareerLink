package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Performance;

import java.util.List;

public interface IPerformanceService {
    Performance addPerformence(Performance performence);
    Performance bestEmplyeeOfThisMonth();
    Performance updatePerformence(Performance performence);
    Performance getOnePerformence(Integer idPerformence);
    List<Performance> getAllPerformences();
    List<Performance> getAllPerformencesbyid(String email);
    List<Performance> getPerformanceByYearAndMonth(int year,int month);
    void deletePerformence(Integer idPerformence);
    float getCurrentWeekGradeForUser(Integer userId);
}
