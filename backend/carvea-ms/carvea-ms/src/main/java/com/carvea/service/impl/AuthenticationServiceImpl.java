package com.carvea.service.impl;

import com.carvea.dto.LoginUserDto;
import com.carvea.dto.RegisterUserDto;
import com.carvea.dto.VerifyUserDto;
import com.carvea.exceptions.CustomException;
import com.carvea.enums.UserCustomError;
import com.carvea.model.Role;
import com.carvea.enums.RoleEnum;
import com.carvea.model.User;
import com.carvea.repository.RoleRepository;
import com.carvea.repository.UserRepository;
import com.carvea.service.AuthenticationService;
import com.carvea.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final RoleRepository roleRepository;

    public AuthenticationServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            EmailServiceImpl emailService,
            RoleRepository roleRepository
    ){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
        this.roleRepository = roleRepository;
    }

    public User signup(RegisterUserDto input) {
        Role role = roleRepository.findByName(RoleEnum.USER)
                .orElseThrow(() -> {
                    log.error("Role with name {} not found!", RoleEnum.USER.name());
                    return new CustomException(UserCustomError.USER_ROLE_NOT_FOUND);
                });

        User user = new User(input.getUsername(), input.getEmail(), passwordEncoder.encode(input.getPassword()));

        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(true);
        user.setRole(role);

        sendVerificationEmail(user);

        log.info("Creating user: {}.", user);
        User createdUser = userRepository.save(user);
        log.info("Successfully created user: {}.", createdUser);
        return user;
    }


    public User authenticate(LoginUserDto input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> {
                    log.info("User with email {} not found!", input.getEmail());
                    return new CustomException(UserCustomError.USER_NOT_FOUND);
                });

        if(!user.isEnabled()) {
            log.error("User with email {} not enabled!", input.getEmail());
            throw new CustomException(UserCustomError.USER_NOT_VERIFIED);
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        log.info("Authenticated/Logged in user: {}.", user);
        return user;
    }

    public void verifyUser(VerifyUserDto input){
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())){
                log.error("User verification code expired!");
                throw new CustomException(UserCustomError.USER_VERIFICATION_CODE_EXPIRED);
            }
            if(user.getVerificationCode().equals(input.getVerificationCode())){
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                userRepository.save(user);
            } else{
                log.error("User verification code not matched!");
                throw new CustomException(UserCustomError.USER_VERIFICATION_CODE_INVALID);
            }
        } else {
            log.error("User with email {} not found!", input.getEmail());
            throw new CustomException(UserCustomError.USER_NOT_FOUND);
        }
        log.info("Verifying user: {}.", input.getEmail());
    }

    public void resendVerificationCode(String email){
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.isEnabled()) {
                log.info("User is already verified!");
                throw new CustomException(UserCustomError.USER_ACCOUNT_ALREADY_VERIFIED);
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            log.info("Verfying user: {}.", user);
            userRepository.save(user);
            log.info("User verified successfully!");
        }else {
            log.error("User with email {} not found!", email);
            throw new CustomException(UserCustomError.USER_NOT_FOUND);
        }
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
