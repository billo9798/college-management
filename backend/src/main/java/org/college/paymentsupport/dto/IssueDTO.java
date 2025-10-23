package org.college.paymentsupport.dto;

import lombok.*;
import org.college.paymentsupport.entity.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class IssueDTO {
    private Long id;
    private String title;
    private String description;
    private IssuePriority priority;
    private IssueStatus status;
    private IssueType issueType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Department assignedToDepartment;
    private LocalDateTime dueAt;
    private boolean globalIssue;
    private UserDto student;
    private UserDto resolvedBy;

    private List<IssueAttachmentDTO> attachments;
    private List<IssueCommentDTO> comments;

    public static IssueDTO mapToDto(Issue issue) {
        List<IssueAttachmentDTO> attachmentDTOs = (issue.getAttachments() != null && !issue.getAttachments().isEmpty())
                ? issue.getAttachments().stream()
                .map(IssueAttachmentDTO::mapToDto)
                .toList()
                : Collections.emptyList();

        List<IssueCommentDTO> commentDTOs = (issue.getComments() != null && !issue.getComments().isEmpty())
                ? issue.getComments().stream()
                .map(IssueCommentDTO::mapToDto)
                .toList()
                : Collections.emptyList();
        UserDto studentValue =  UserDto.mapToDto(issue.getStudent());
        UserDto resolvedUser = UserDto.mapToDto(issue.getResolvedBy());
        return new IssueDTO(
                issue.getId(),
                issue.getTitle(),
                issue.getDescription(),
                issue.getPriority(),
                issue.getStatus(),
                issue.getIssueType(),
                issue.getCreatedAt(),
                issue.getUpdatedAt(),
                issue.getAssignedToDepartment(),
                issue.getDueAt(),
                issue.isGlobalIssue(),
                studentValue,
                resolvedUser,
                attachmentDTOs,
                commentDTOs
        );
    }
}

