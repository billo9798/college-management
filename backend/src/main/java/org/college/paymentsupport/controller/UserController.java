package org.college.paymentsupport.controller;

import jakarta.validation.Valid;
import org.college.paymentsupport.dto.UpdateUserRequest;
import org.college.paymentsupport.dto.UserDto;
import org.college.paymentsupport.entity.Role;
import org.college.paymentsupport.entity.User;
import org.college.paymentsupport.security.JwtUtils;
import org.college.paymentsupport.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtils jwtUtils;
    public UserController(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping(value ="/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> registerUser(
            @RequestParam String fullName,
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam Long rollNumber,
            @RequestParam(required = false) MultipartFile[] files
    ) {
        try {
            User saved = userService.registerUser(
                    fullName,
                    username,
                    email,
                    password,
                    rollNumber,
                    files
            );
            return ResponseEntity.ok("user saved successfully " + saved.toString());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping(value ="/update")
    public ResponseEntity<String> updateUser(
            @RequestParam Long userId,
            @RequestParam String accountNumber,
            @RequestParam String ifscCode,
            @RequestParam String bankName,
            @RequestParam String branchName
    ) {
        try {
            User saved = userService.updateUserAccountDetails(
                    userId,
                    accountNumber,
                    ifscCode,
                    bankName,
                    branchName
            );
            return ResponseEntity.ok("user De successfully " + saved.toString());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create-user")
    public ResponseEntity<String> createUser(
            @RequestParam String fullName,
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String role,
            @RequestParam String password,
            @RequestParam Long rollNumber,
            @RequestParam(required = false) MultipartFile[] files
    ) {
        try {
            User saved = userService.createUser(
                    fullName,
                    username,
                    email,
                    role,
                    password,
                    rollNumber,
                    files
            );
            return ResponseEntity.ok("User saved Successfully " + saved.toString());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username,
                                   @RequestParam String password) {
        Optional<User> user = userService.login(username);
        String role = null;
        boolean status = false;
        boolean userPasStatus = false;
        long userId = 0;
        if(user.isPresent()) {
            role = user.get().getRole().name();
            status = user.get().isActive_status();
            userPasStatus = userService.checkPassword(user.get(), password);
            userId = user.get().getId();
        }
        if (userPasStatus && status) {
            String token = jwtUtils.generateToken(username);
            return ResponseEntity.ok(Map.of(
                    "userName", username,
                    "token", token,
                    "tokenType", "Bearer",
                    "role", role,
                    "status", status,
                    "userId", userId
            ));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("#id == principal.id or hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest updateRequest) {
        UserDto updatedUser = userService.updateUser(id, updateRequest);
        return ResponseEntity.ok(updatedUser);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'HOD')")
    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> listAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'HOD', 'STAFF')")
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id, @AuthenticationPrincipal User currentUser) {

        if (currentUser.getRole() == Role.STUDENT) {
            return "not valid user";
        }
        userService.deleteUser(id);
        return "User deleted";
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'HOD')")
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateUserStatus(
            @PathVariable Long id,
            @RequestParam boolean active) {
        userService.updateUserStatus(id, active);
        return ResponseEntity.ok("User status updated successfully");
    }
}
