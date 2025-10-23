package org.college.paymentsupport.dto;

import lombok.Data;

@Data
public class UserAttachmentDTO {
    private Long id;
    private String fileName;
    private String fileType;
    private byte[] fileData;
    private UserDto user;

    public UserAttachmentDTO(Long id, String fileName, String fileType, byte[] fileData) {
        this.id = id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileData = fileData;
    }
}
