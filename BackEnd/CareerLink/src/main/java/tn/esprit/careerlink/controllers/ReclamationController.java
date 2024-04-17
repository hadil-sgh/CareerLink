package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.Expense;
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
    @PostMapping("/{idexpense}/addAndAffect")
    public ResponseEntity<Reclamation> addReclamationAndAffect(@PathVariable Integer idexpense, @RequestBody Reclamation reclamation) {
        Reclamation addReclamationAndAffect =iReclamationService.addReclamationAndAffect(idexpense,reclamation);
        return ResponseEntity.ok(addReclamationAndAffect);
    }

    @PutMapping("/update")
    public ResponseEntity<Reclamation> updateReclamation(@RequestBody Reclamation reclamation) {
        Reclamation updatedReclamation = iReclamationService.updateReclamation(reclamation);
        return ResponseEntity.ok(updatedReclamation);
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
    @GetMapping("/tri")
    List<Reclamation> tri() {
        return iReclamationService.tri();
    }
}
