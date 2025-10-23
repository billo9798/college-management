package org.college.paymentsupport.dto;

import lombok.*;
import org.college.paymentsupport.entity.IssueComment;

import java.time.LocalDateTime;


@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class IssueCommentDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private UserDto createdBy;

    public static IssueCommentDTO mapToDto(IssueComment issueComment) {
        return new IssueCommentDTO(
                issueComment.getId(),
                issueComment.getContent(),
                issueComment.getCreatedAt(),
                UserDto.mapToDto(issueComment.getCreatedBy())
        );
    }
}

