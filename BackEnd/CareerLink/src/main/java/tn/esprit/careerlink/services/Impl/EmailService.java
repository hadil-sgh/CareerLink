package tn.esprit.careerlink.services.Impl;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.config.JwtService;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.UserRepository;
import tn.esprit.careerlink.services.EmailSender;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
@Slf4j
public class EmailService implements EmailSender {




    private final JavaMailSender mailSender;
    private UserRepository userRepository;
    private JwtService jwtService;

    @Override

    public void send(String to, String subject, Map<String, String> placeholders) {
        try {
            // Read the email template HTML file
            ClassPathResource emailTemplateResource = new ClassPathResource("emailacceptencetemplate.html");
            String emailContent = new String(Files.readAllBytes(emailTemplateResource.getFile().toPath()), StandardCharsets.UTF_8);

            // Replace placeholders with actual values
            for (Map.Entry<String, String> entry : placeholders.entrySet()) {
                emailContent = emailContent.replace("{{" + entry.getKey() + "}}", entry.getValue());
            }

            // Create the email message
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(emailContent, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom("careerlinkcontact@gmail.com");

            // Send the email
            mailSender.send(mimeMessage);
        } catch (MessagingException | IOException e) {
            log.error("Failed to send email: " + e.getMessage());
            throw new IllegalStateException("Failed to send email");
        }
    }



    @Override
    @Async
    public void regsend(String to, String subject, User user, String email, String activationCode) {
        try {
            // Generate the registration URL with the activation code
            String registrationUrl = "http://localhost:4200/register" + "?" + activationCode;

            // Read the email template HTML file
            ClassPathResource emailTemplate = new ClassPathResource("emailtemplate.html");
            String emailContent = new String(emailTemplate.getContentAsByteArray(), StandardCharsets.UTF_8);

            // Replace the placeholders with actual values
            emailContent = emailContent.replace("${user.firstName}", user.getFirstName());
            emailContent = emailContent.replace("${user.lastName}", user.getLastName());
            emailContent = emailContent.replace("${registrationUrl}", registrationUrl);

            // Create the email message
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(emailContent, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom("careerlinkcontact@gmail.com");

            // Send the email
            mailSender.send(mimeMessage);
        } catch (MessagingException | IOException e) {
            log.error("failed to send email " + e);
            throw new IllegalStateException("failed to send email");
        }
    }



}
