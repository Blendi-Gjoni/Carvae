package com.carvea.service;

import jakarta.mail.MessagingException;

public interface EmailService {
    public void sendVerificationEmail(String to, String Subject, String text) throws MessagingException;
}
