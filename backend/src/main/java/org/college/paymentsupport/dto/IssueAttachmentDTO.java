package org.college.paymentsupport.dto;


import lombok.*;
import org.college.paymentsupport.entity.Issue;
import org.college.paymentsupport.entity.IssueAttachment;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class IssueAttachmentDTO {
    private Long id;
    private String fileName;
    private String fileType;
    private byte[] fileData;


    public static IssueAttachmentDTO mapToDto(IssueAttachment issueAttachment) {
        return new IssueAttachmentDTO(
                issueAttachment.getId(),
                issueAttachment.getFileName(),
                issueAttachment.getFileType(),
                issueAttachment.getFileData()
        );
    }
}
