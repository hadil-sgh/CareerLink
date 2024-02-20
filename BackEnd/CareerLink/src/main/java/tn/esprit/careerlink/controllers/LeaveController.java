package tn.esprit.careerlink.controllers;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.Leave;
import tn.esprit.careerlink.services.ILeaveService;


import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Leave")

public class LeaveController {

    private  final ILeaveService leaveService;
    @PostMapping("/add")
    public Leave addStudent(@RequestBody Leave Leave){
        return leaveService.addLeave(Leave);
    }
    @PutMapping("/update")
    public Leave updateStudent(@RequestBody Leave Leave ){
        return leaveService.updateLeave(Leave);
    }

    @GetMapping("/getOne/{id}")
    public Leave getOneStudent(@PathVariable ("id")Integer idLeave){
        return leaveService.getOneLeave(idLeave);
    }

    @GetMapping("/getAll")
    public List<Leave> getAllStudent(){
        return leaveService.getAllLeaves();
    }

    @DeleteMapping("/delete/{id}")
    public void  deleteStudent(@PathVariable ("id") Integer idLeave) {
        leaveService.deleteLeave(idLeave);    }


}
