package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.Client;

import java.util.List;

public interface IClientService {
    Client addClient(Client client);

    Client updateClient(Client client);

    Client getOneClient(Integer idClient);

    List<Client> getAllClients();

    void deleteClient(Integer idClient);
}
