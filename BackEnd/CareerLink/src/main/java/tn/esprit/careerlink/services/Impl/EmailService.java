package tn.esprit.careerlink.services.Impl;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import tn.esprit.careerlink.config.JwtService;
import tn.esprit.careerlink.entities.User;
import tn.esprit.careerlink.repositories.UserRepository;
import tn.esprit.careerlink.services.EmailSender;

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

    public void send(String to, String subject,String email) {
        try {

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom("careerlinkcontact@gmail.com");
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            log.error("failed to send email " + e);

            throw new IllegalStateException("failed to send email");
        }
    }

    @Override
    @Async
    public void regsend(String to, String subject, User user, String email, String activationCode) {
        try {
            String registrationUrl = "http://localhost:4200/register" +"?Act="+ activationCode;

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, "utf-8");

            String emailContent = "Hello"+ user.getFirstName() + user.getLastName() +",\n\n" +
                    "Welcome to our app! Please click the link below to complete your registration:\n\n" +
                    registrationUrl + "\n\n" +
                    "Thanks,\nThe Team";

            helper.setText(emailContent, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom("careerlinkcontact@gmail.com");
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            log.error("failed to send email " + e);

            throw new IllegalStateException("failed to send email");
        }
    }


}
