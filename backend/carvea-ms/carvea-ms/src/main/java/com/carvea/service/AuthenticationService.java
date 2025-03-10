package com.carvea.service;

import com.carvea.dto.LoginUserDto;
import com.carvea.dto.RegisterUserDto;
import com.carvea.dto.VerifyUserDto;
import com.carvea.model.User;

public interface AuthenticationService {
    public User signup(RegisterUserDto input);
    public User authenticate(LoginUserDto input);
    public void verifyUser(VerifyUserDto input);
    public void resendVerificationCode(String email);
    public void sendVerificationEmail(User user);
}
