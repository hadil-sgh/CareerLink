package tn.esprit.careerlink.services.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Task;
import tn.esprit.careerlink.repositories.TaskRepository;
import tn.esprit.careerlink.services.ITaskService;

import java.util.Date;
import java.util.List;
@Service
public class TaskService implements ITaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Override
    public List<Task> getTasksForUserThisMonth(Integer userId, Date startDate, Date endDate) {
        return taskRepository.findByUserIdAndDueDateBetween(Long.valueOf(userId), startDate, endDate);
    }}
