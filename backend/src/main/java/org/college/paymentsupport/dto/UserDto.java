package org.college.paymentsupport.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.college.paymentsupport.entity.User;

import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String role;
    private String fullName;
    private Long rollNumber;
    private boolean active_status;
    private List<UserAttachmentDTO> userAttachments;

    public UserDto(
        Long id,
        String username,
        @NotBlank @Email @Size(max = 120) String email,
        String role,
        @NotBlank @Size(min = 3, max = 50) String fullName,
        Long rollNumber,
        boolean activeStatus
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.fullName = fullName;
        this.rollNumber = rollNumber;
        this.active_status = activeStatus;
    }

    public UserDto(
            Long id,
            String username,
            String email,
            String role,
            String fullName,
            Long rollNumber,
            boolean activeStatus,
            List<UserAttachmentDTO> userAttachments
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.fullName = fullName;
        this.rollNumber = rollNumber;
        this.active_status = activeStatus;
        this.userAttachments = userAttachments;
    }

    public static UserDto mapToDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.getFullName(),
                user.getRollNumber(),
                user.isActive_status());
    }
}
