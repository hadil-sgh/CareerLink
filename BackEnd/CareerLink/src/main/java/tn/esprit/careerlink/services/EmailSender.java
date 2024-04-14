package tn.esprit.careerlink.services;

import tn.esprit.careerlink.entities.User;

import java.util.Map;

public interface EmailSender {
    void send(String to, String subject, Map<String, String> placeholders);
    void regsend(String to, String subject, User user, String email, String activationCode);

}
