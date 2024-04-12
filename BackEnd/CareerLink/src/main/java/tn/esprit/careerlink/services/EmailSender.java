package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.User;

public interface EmailSender {
    void send(String to,String subject, String email);
    void regsend(String to, String subject, User user, String email, String activationCode);

}
