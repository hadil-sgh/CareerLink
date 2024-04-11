package tn.esprit.careerlink.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.careerlink.entities.Expense;
import tn.esprit.careerlink.entities.Reclamation;
import tn.esprit.careerlink.entities.Reponse;
import tn.esprit.careerlink.services.IReponseService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/Reponse")

public class ReponseController {
    @Autowired
    IReponseService iReponseService;
    @PostMapping("/add")
    public Reponse addReponse(@RequestBody Reponse reponse) {
        return iReponseService.addReponse(reponse);
    }





    @PutMapping("/update")
    public ResponseEntity<Reponse> updateReponse(@RequestBody Reponse reponse) {
        Reponse updateReponse = iReponseService.updateReponse(reponse);
        return ResponseEntity.ok(updateReponse);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteReponse(@PathVariable ("id")Integer idreponse) {
       iReponseService.deleteReponse(idreponse);
    }
    @GetMapping("/getAll")
    public List<Reponse> getAllReponse(){
        return iReponseService.getAllReponse();
    }
    @GetMapping("/get/{id}")
    public Reponse getReponse(@PathVariable ("id") Integer idreponse) {
        return iReponseService.getReponse(idreponse);
    }
    @PostMapping("/{idreclamation}/addAndAffect")
    public ResponseEntity<Reponse> addReponseAndAffect(@PathVariable Integer idreclamation, @RequestBody Reponse reponse) {
        Reponse addReponseAndAffect =iReponseService.addReponseAndAffect(idreclamation,reponse);
        return ResponseEntity.ok(addReponseAndAffect);
    }
}
