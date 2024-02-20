package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Leave;

import java.util.List;

public interface ILeaveService {
    Leave addLeave(Leave leave);
    Leave updateLeave(Leave leave);
    Leave getOneLeave(Integer idLeave);
    List<Leave> getAllLeaves();
    void deleteLeave(Integer idLeave);
}
