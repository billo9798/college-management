package org.college.paymentsupport.dto;

import lombok.*;
import org.college.paymentsupport.entity.Department;
import org.college.paymentsupport.entity.IssuePriority;

@Data
public class IssueCreateRequest {
    private String title;
    private String description;
    private IssuePriority priority;
    private Long issueTypeId;
    private boolean global_issue;
    private Department assignedToDepartment;
}
