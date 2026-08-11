package com.abtalks.service;

import com.abtalks.dto.AuthResponse;
import com.abtalks.dto.LoginRequest;
import com.abtalks.dto.SignupRequest;
import com.abtalks.dto.UserDto;
import com.abtalks.model.User;
import com.abtalks.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse signup(SignupRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(cleanEmail)) {
            return new AuthResponse(false, "An account with this email already exists", null);
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getName().trim(),
                cleanEmail,
                hashedPassword,
                request.getCollege().trim(),
                request.getTrack().trim()
        );

        User savedUser = userRepository.save(user);
        UserDto userDto = mapToUserDto(savedUser);

        return new AuthResponse(true, "Account created successfully", userDto);
    }

    public AuthResponse login(LoginRequest request) {
        String cleanEmail = request.getEmail().trim().toLowerCase();

        Optional<User> userOptional = userRepository.findByEmail(cleanEmail);
        if (userOptional.isEmpty()) {
            return new AuthResponse(false, "Invalid email or password", null);
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(false, "Invalid email or password", null);
        }

        UserDto userDto = mapToUserDto(user);
        return new AuthResponse(true, "Login successful", userDto);
    }

    public UserDto mapToUserDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCollege(),
                user.getTrack()
        );
    }
}
