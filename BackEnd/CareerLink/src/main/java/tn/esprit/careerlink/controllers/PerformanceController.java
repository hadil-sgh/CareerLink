package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.Performance;
import tn.esprit.careerlink.services.Impl.PerformanceServiceImpl;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/Performance")
public class PerformanceController {
    private  final PerformanceServiceImpl performenceService;
    @PostMapping("/add")
    public Performance addPerformance(@RequestBody Performance Performance){
        return performenceService.addPerformence(Performance);
    }
    @PutMapping("/update")
    public Performance updatePerformance(@RequestBody Performance Performance ){
        return performenceService.updatePerformence(Performance);
    }

    @GetMapping("/getOne/{id}")
    public Performance getOnePerformance(@PathVariable ("id")Integer idPerformance){
        return performenceService.getOnePerformence(idPerformance);
    }

    @GetMapping("/getAll")
    public List<Performance> getAllPerformance(){
        return performenceService.getAllPerformences();
    }

    @DeleteMapping("/delete/{id}")
    public void  deletePerformance(@PathVariable ("id") Integer idPerformance) {
        performenceService.deletePerformence(idPerformance);    }

}
