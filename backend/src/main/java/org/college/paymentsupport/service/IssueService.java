package org.college.paymentsupport.service;

import jakarta.transaction.Transactional;
import org.college.paymentsupport.dto.IssueDTO;
import org.college.paymentsupport.entity.*;
import org.college.paymentsupport.exception.NotFoundException;
import org.college.paymentsupport.repository.*;
import org.college.paymentsupport.service.notify.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class IssueService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private IssueTypeRepository issueTypeRepository;
    @Autowired
    private IssueCommentRepository issueCommentRepository;
    @Autowired
    private IssueAttachmentRepository issueAttachmentRepository;
    @Autowired
    @Qualifier("emailNotificationService")
    private NotificationService notificationService;

    // Create issue with attachments
    public IssueDTO createIssue(Long studentId, String title, String description,
                                IssuePriority priority, Long issueTypeId, Department assignedToDepartment, MultipartFile[] files) throws IOException {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new NotFoundException("Student not found"));

        IssueType issueType = issueTypeRepository.findById(issueTypeId)
                .orElseThrow(() -> new NotFoundException("Issue type not found"));

        Issue issue = new Issue();
        issue.setStudent(student);
        issue.setTitle(title);
        issue.setDescription(description);
        issue.setPriority(priority);
        issue.setIssueType(issueType);
        issue.setAssignedToDepartment(assignedToDepartment);
        issue.setCreatedAt(LocalDateTime.now());
        issue.setUpdatedAt(LocalDateTime.now());
        issue.setDueAt(addWorkingDays(LocalDateTime.now(), 20));
        issue.setStatus(IssueStatus.OPEN);

        List<IssueAttachment> attachments = new ArrayList<>();
        if (files != null) {
            for (MultipartFile f : files) {
                if (f == null || f.isEmpty()) continue;
                IssueAttachment att = new IssueAttachment();
                att.setFileName(f.getOriginalFilename());
                att.setFileType(f.getContentType());
                att.setFileData(f.getBytes());
                att.setIssue(issue);
                attachments.add(att);
            }
            issue.setAttachments(attachments);
        }

        Issue saved = issueRepository.save(issue);

        // persist attachments (cascade should handle it if configured; otherwise save explicitly)
        if (!attachments.isEmpty()) {
            issueAttachmentRepository.saveAll(attachments);
        }

        // Notify student (email, sms)
//        String msg = String.format("Your issue #%d has been created. Title: %s", saved.getId(), saved.getTitle());
//        notificationService.notifyIssueCreated(saved.getId(), student.getId(), student.getEmail(), msg);

        return IssueDTO.mapToDto(saved);
    }

    public IssueDTO getIssueById(Long issueId, User currentUser) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new NotFoundException("Issue not found"));

        if (currentUser.getRole() == Role.STUDENT &&
                !issue.getStudent().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You are not allowed to view this issue");
        }
        return IssueDTO.mapToDto(issue);
    }

    public List<IssueDTO> getIssuesForStudent(User currentUser) {
        List<Issue> issues = issueRepository.findByStudentId(currentUser.getId());

        return issues.stream()
                .map(IssueDTO::mapToDto)
                .collect(Collectors.toList());
    }

    public List<IssueDTO> getAllIssues() {
        List<Issue> issues = issueRepository.findAll();

        return issues.stream()
                .map(IssueDTO::mapToDto)
                .collect(Collectors.toList());
    }

    public Issue updateIssueStatus(Long issueId, IssueStatus status, User changedBy) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new NotFoundException("Issue not found"));

        issue.setStatus(status);
        issue.setResolvedBy(changedBy);
        issue.setUpdatedAt(LocalDateTime.now());
        Issue saved = issueRepository.save(issue);

        // Notify student
//        User student = saved.getStudent();
//        String msg = String.format("Status of issue #%d updated to %s by %s", saved.getId(), status, changedBy.getUsername());
//        notificationService.notifyIssueStatusChanged(saved.getId(), student.getId(), student.getEmail(), msg);

        return saved;
    }

    // Filtering helpers
    public List<IssueDTO> filterIssuesByStatus(IssueStatus status) {
        List<Issue> issues = issueRepository.findByStatus(status);

        return issues.stream()
                .map(IssueDTO::mapToDto)
                .collect(Collectors.toList());
    }

    // filter all global issue for all student
    public List<IssueDTO> filterGlobalIssue(){
        List<Issue> issues = issueRepository.findByGlobalIssueTrue();

        return issues.stream()
                .map(IssueDTO::mapToDto)
                .collect(Collectors.toList());
    }

    public IssueAttachment getAttachment(Long attachmentId) {
        return issueAttachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new NotFoundException("Attachment not found"));
    }

//    public List<Issue> getIssuesByDepartment(Department department) {
//        return issueRepository.findByIssueType_Department(department);
//    }

    public static LocalDateTime addWorkingDays(LocalDateTime start, int daysToAdd) {
        LocalDateTime result = start;
        int addedDays = 0;

        while (addedDays < daysToAdd) {
            result = result.plusDays(1);
            DayOfWeek day = result.getDayOfWeek();
            if (day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY) {
                addedDays++;
            }
        }

        return result;
    }
}
