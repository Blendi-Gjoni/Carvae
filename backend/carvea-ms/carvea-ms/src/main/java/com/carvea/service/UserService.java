package com.carvea.service;

import com.carvea.dto.RegisterUserDto;
import com.carvea.model.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();
    public List<Object[]> getNumberOfUsersByRole();
    public User createAdministrator(RegisterUserDto input);
    public void sendVerificationEmail(User user);
}
