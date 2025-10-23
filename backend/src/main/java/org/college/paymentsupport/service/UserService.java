package org.college.paymentsupport.service;

import jakarta.transaction.Transactional;
import org.college.paymentsupport.dto.UpdateUserRequest;
import org.college.paymentsupport.dto.UserAttachmentDTO;
import org.college.paymentsupport.dto.UserDto;
import org.college.paymentsupport.entity.Role;
import org.college.paymentsupport.entity.User;
import org.college.paymentsupport.entity.UserAttachment;
import org.college.paymentsupport.exception.ResourceNotFoundException;
import org.college.paymentsupport.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(
            String fullName,
            String username,
            String email,
            String password,
            Long rollNumber,
            MultipartFile[] files
    ) throws IOException {

        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already taken");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setFullName(fullName);
        user.setRollNumber(rollNumber);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.STUDENT);
        user.setCreatedAt(Instant.now());
        user.setActive_status(false);
        List<UserAttachment> attachments = new ArrayList<>();
        if (files != null) {
            for (MultipartFile f : files) {
                if (f == null || f.isEmpty()) continue;
                UserAttachment att = new UserAttachment();
                att.setFileName(f.getOriginalFilename());
                att.setFileType(f.getContentType());
                att.setFileData(f.getBytes());
                att.setUser(user);
                attachments.add(att);
            }
            user.setUser_attachments(attachments);
        }
        return userRepository.save(user);
    }


    public User createUser(
            String fullName,
            String username,
            String email,
            String role,
            String password,
            Long rollNumber,
            MultipartFile[] files
    ) throws IOException {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already taken");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setFullName(fullName);
        user.setRollNumber(rollNumber);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.valueOf(role));
        user.setCreatedAt(Instant.now());
        user.setActive_status(false);
        List<UserAttachment> attachments = new ArrayList<>();
        if (files != null) {
            for (MultipartFile f : files) {
                if (f == null || f.isEmpty()) continue;
                UserAttachment att = new UserAttachment();
                att.setFileName(f.getOriginalFilename());
                att.setFileType(f.getContentType());
                att.setFileData(f.getBytes());
                att.setUser(user);
                attachments.add(att);
            }
            user.setUser_attachments(attachments);
        }
        return userRepository.save(user);
    }


    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    public Optional<User> login(String username) {
        return userRepository.findByUsername(username);
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return UserDto.mapToDto(user);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user ->
                new UserDto(
                            user.getId(),
                            user.getUsername(),
                            user.getEmail(),
                            user.getRole().name(),
                            user.getFullName(),
                            user.getRollNumber(),
                            user.isActive_status(),
                            user.getUser_attachments().stream()
                                    .map(
                                            arr -> new UserAttachmentDTO(
                                                    arr.getId(),
                                                    arr.getFileName(),
                                                    arr.getFileType(),
                                                    arr.getFileData()
                                            ))
                                    .toList()
                    )
                )
                .collect(Collectors.toList());
    }

    public UserDto updateUser(Long id, UpdateUserRequest updateRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        user.setUsername(updateRequest.getUsername());
        user.setEmail(updateRequest.getEmail());
        user.setFullName(updateRequest.getFullName());

        userRepository.save(user);
        return UserDto.mapToDto(user);
    }

    public User updateUserStatus(Long userId, boolean activeStatus) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        boolean status = !activeStatus;
        user.setActive_status(status);
        return userRepository.save(user);
    }
}
