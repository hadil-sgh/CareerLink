package tn.esprit.careerlink.services;

public interface EmailSender {
    void send(String to,String subject, String email);
}
