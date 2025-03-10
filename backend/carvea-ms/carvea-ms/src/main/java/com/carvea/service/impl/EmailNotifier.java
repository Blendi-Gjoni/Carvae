package com.carvea.service.impl;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import com.carvea.observer.Observer;

@Component
public class EmailNotifier implements Observer {

    private final JavaMailSender emailSender;

    public EmailNotifier(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    @Override
    public void update(String message) {
        // Extract email address from the message
        String email = extractEmailFromMessage(message);
        if (email != null) {
            sendEmail(email, "Notification", message);
        } else {
            System.out.println("No email found in message: " + message);
        }
    }

    private String extractEmailFromMessage(String message) {
        String[] parts = message.split("Email: ");
        return parts.length > 1 ? parts[1].trim() : null;
    }

    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        emailSender.send(message);
        System.out.println("Email sent to " + to + " with subject: " + subject + " and body: " + body);
    }
}

