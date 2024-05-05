package tn.esprit.careerlink.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/send")
    @PreAuthorize("hasRole('ADMIN')")
    public void sendNotification() {
        // Logic to send notification
        String notificationMessage = "New notification from admin!";
        messagingTemplate.convertAndSend("/topic/notifications", notificationMessage);
    }
}