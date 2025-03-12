package com.carvea.service.impl;

import com.carvea.dto.RegisterUserDto;
import com.carvea.enums.UserCustomError;
import com.carvea.exceptions.CustomException;
import com.carvea.model.Role;
import com.carvea.enums.RoleEnum;
import com.carvea.model.User;
import com.carvea.repository.RoleRepository;
import com.carvea.repository.UserRepository;
import com.carvea.service.EmailService;
import com.carvea.service.UserService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, EmailServiceImpl emailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        if(users.isEmpty()){
            log.warn("No users found!");
        }
        log.info("Fetching {} users from the database.", users.size());
        userRepository.findAll().forEach(users::add);
        log.info("Fetched {} users from the database.", users.size());
        return users;
    }

    public List<Object[]> getNumberOfUsersByRole() {
        log.info("Fetched number of users by role.");
        return userRepository.findNumberOfUsersByRole();
    }

    public User createAdministrator(RegisterUserDto input){
        Role role = roleRepository.findByName(RoleEnum.ADMIN)
                .orElseThrow(() -> {
                    log.error("Role with name {} not found.", RoleEnum.ADMIN);
                    return new CustomException(UserCustomError.USER_ROLE_NOT_FOUND);
                });

        User user = new User(input.getUsername(), input.getEmail(), passwordEncoder.encode(input.getPassword()));

        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(true);
        user.setRole(role);

        sendVerificationEmail(user);

        log.info("Creating administrator: {}", user);
        User createdUser = userRepository.save(user);
        log.info("Successfully created administrator: {}", createdUser);
        return createdUser;
    }

    public void sendVerificationEmail(User user){
        String subject = "Account verification";
        String verificationCode = user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to Carvea!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
        try{
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e){
            e.printStackTrace();
        }
    }

    private String generateVerificationCode(){
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}
