package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Leave;
import tn.esprit.careerlink.repositories.LeaveRepository;
import tn.esprit.careerlink.services.ILeaveService;

import java.util.List;
@AllArgsConstructor
@Service
public class LeaveServiceImpl implements ILeaveService {
   private  final LeaveRepository leaveRepository;

    @Override
    public Leave addLeave(Leave leave) {
        return leaveRepository.save(leave);
    }

    @Override
    public Leave updateLeave(Leave leave) {
        return leaveRepository.save(leave);
    }

    @Override
    public Leave getOneLeave(Integer idLeave) {
        return leaveRepository.findById(idLeave).orElse(null);
    }

    @Override
    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }

    @Override
    public void deleteLeave(Integer idLeave) {
        leaveRepository.deleteById(idLeave);
    }
}
