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
    private String accountNumber;
    private String ifscCode;
    private String bankName;
    private String branchName;
    private List<UserAttachmentDTO> userAttachments;

    public UserDto(
            Long id,
            String username,
            @NotBlank @Email @Size(max = 120) String email,
            String role,
            @NotBlank @Size(min = 3, max = 50) String fullName,
            Long rollNumber,
            String accountNumber,
            String ifscCode,
            String bankName,
            String branchName,
            boolean activeStatus
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.fullName = fullName;
        this.rollNumber = rollNumber;
        this.accountNumber = accountNumber;
        this.ifscCode = ifscCode;
        this.bankName = bankName;
        this.branchName = branchName;
        this.active_status = activeStatus;
    }

    public UserDto(
            Long id,
            String username,
            String email,
            String role,
            String fullName,
            Long rollNumber,
            String accountNumber,
            String ifscCode,
            String bankName,
            String branchName,
            boolean activeStatus,
            List<UserAttachmentDTO> userAttachments
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.fullName = fullName;
        this.rollNumber = rollNumber;
        this.accountNumber = accountNumber;
        this.ifscCode = ifscCode;
        this.bankName = bankName;
        this.branchName = branchName;
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
                user.getAccountNumber(),
                user.getIfscCode(),
                user.getBankName(),
                user.getBranchName(),
                user.isActive_status());
    }
}
