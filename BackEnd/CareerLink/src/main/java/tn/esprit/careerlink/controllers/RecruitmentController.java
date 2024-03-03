package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.Recruitment;
import tn.esprit.careerlink.services.Impl.RecruitmentServiceImpl;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/Recruitment")
public class RecruitmentController {

    private  final RecruitmentServiceImpl recruitmentService;
    @PostMapping("/add")
    public Recruitment addRecruitment(@RequestBody Recruitment r){

        return recruitmentService.addRecruitment(r);
    }
    @PutMapping("/update")
    public Recruitment updateRecruitment(@RequestBody Recruitment r ){

        return recruitmentService.updateRecruitment(r);
    }

    @GetMapping("/getOne/{id}")
    public Recruitment getOneRecruitment(@PathVariable ("id")Integer idRecruitment){

        return recruitmentService.getOneRecruitment(idRecruitment);
    }

    @GetMapping("/getAll")
    public List<Recruitment> getAllRecruitments(){
        return recruitmentService.getAllRecruitments();
    }

    @DeleteMapping("/delete/{id}")
    public void  deleteRecruitment(@PathVariable ("id") Integer idRecruitment) {
        recruitmentService.deleteRecruitment(idRecruitment);
    }
}
