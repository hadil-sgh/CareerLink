package tn.esprit.careerlink.controllers;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.careerlink.entities.Client;
import tn.esprit.careerlink.services.IClientService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Client")
public class ClientController {
    private  final IClientService ClientService;
    @PostMapping("/add")
    public Client addClient(@RequestBody Client Client){
        return ClientService.addClient(Client);
    }
    @PutMapping("/update")
    public Client updateClient(@RequestBody Client Client ){
        return ClientService.updateClient(Client);
    }

    @GetMapping("/getOne/{id}")
    public Client getOneClient(@PathVariable ("id")Integer idClient){
        return ClientService.getOneClient(idClient);
    }

    @GetMapping("/getAll")
    public List<Client> getAllClient(){
        return ClientService.getAllClients();
    }

    @DeleteMapping("/delete/{id}")
    public void  deleteClient(@PathVariable ("id") Integer idClient) {
        ClientService.deleteClient(idClient);    }


}

