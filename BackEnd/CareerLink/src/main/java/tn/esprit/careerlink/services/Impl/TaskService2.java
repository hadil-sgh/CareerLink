package tn.esprit.careerlink.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Task;
import tn.esprit.careerlink.repositories.TaskRepository2;
import tn.esprit.careerlink.services.ITaskService2;

import java.util.Date;
import java.util.List;
@Service
public class TaskService2 implements ITaskService2 {
    @Autowired
    private TaskRepository2 taskRepository;
    @Override
    public List<Task> getTasksForUserThisMonth(Integer userId, Date startDate, Date endDate) {
        return taskRepository.findByUserIdAndDueDateBetween(Long.valueOf(userId), startDate, endDate);
    }}
