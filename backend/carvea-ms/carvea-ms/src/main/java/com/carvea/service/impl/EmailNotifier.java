package com.carvea.service.impl;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import com.carvea.observer.Observer;

@Component
public class EmailNotifier implements Observer {

    private final JavaMailSender emailSender;

    public EmailNotifier(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    @Override
    public void update(String email, String subject, String message) {
        if (email != null && !email.isEmpty()) {
            sendEmail(email, subject, message);  // Subject is dynamic now
        } else {
            System.out.println("No email provided for notification.");
        }
    }



    private String extractEmailFromMessage(String message) {
        String[] parts = message.split("Email: ");
        return parts.length > 1 ? parts[1].trim() : null;
    }

    public void sendEmail(String to, String subject, String body) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true); // Set second parameter to true for HTML

            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

