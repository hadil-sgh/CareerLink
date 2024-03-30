package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.Reclamation;
import tn.esprit.careerlink.services.IReclamationService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/Reclamation")

public class ReclamationController {
    @Autowired
    IReclamationService iReclamationService;
    @PostMapping("/add")
    public Reclamation addReclamation(@RequestBody Reclamation reclamation) {
        return iReclamationService.addReclamation(reclamation);
    }

    @PutMapping("/update")
    public Reclamation updateReclamation(@RequestBody Reclamation reclamation){
        return iReclamationService.updateReclamation(reclamation);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteReclamation(@PathVariable ("id")Integer idreclamation) {
        iReclamationService.deleteReclamation(idreclamation);
    }
    @GetMapping("/getAll")
    public List<Reclamation> getAllReclamation(){
        return iReclamationService.getAllReclamation();
    }
    @GetMapping("/get/{id}")
    public Reclamation getReclamation(@PathVariable ("id") Integer idreclamation) {
        return iReclamationService.getReclamation(idreclamation);
    }
}
