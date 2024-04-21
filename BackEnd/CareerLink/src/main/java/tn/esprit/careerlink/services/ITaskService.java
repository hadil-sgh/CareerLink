package tn.esprit.careerlink.services;


import tn.esprit.careerlink.entities.Task;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface ITaskService  {
    public List<Task> getTasksForUserThisMonth(Integer userId, Date startDate, Date endDate) ;
}

