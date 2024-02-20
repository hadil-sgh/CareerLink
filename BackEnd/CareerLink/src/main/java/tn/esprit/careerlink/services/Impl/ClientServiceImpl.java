package tn.esprit.careerlink.services.Impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.entities.Client;
import tn.esprit.careerlink.repositories.ClientRepository;
import tn.esprit.careerlink.services.IClientService;

import java.util.List;
@AllArgsConstructor
@Service
public class ClientServiceImpl implements IClientService {
    final ClientRepository clientRepository;
    @Override
    public Client addClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client updateClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client getOneClient(Integer idClient) {
        return clientRepository.findById(idClient).orElse(null);
    }

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public void deleteClient(Integer idClient) {
        clientRepository.deleteById(idClient);
    }
}
