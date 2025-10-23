package org.college.paymentsupport.controller;

import org.college.paymentsupport.dto.IssueDTO;
import org.college.paymentsupport.entity.*;
import org.college.paymentsupport.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<IssueDTO> createIssue(
            @AuthenticationPrincipal User currentUser,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam IssuePriority priority,
            @RequestParam Long issueTypeId,
            @RequestParam Department assignedToDepartment,
            @RequestParam(required = false) MultipartFile[] files) throws IOException {

        if (currentUser.getRole() != Role.STUDENT) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        IssueDTO saved = issueService.createIssue(currentUser.getId(), title, description, priority, issueTypeId, assignedToDepartment, files);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IssueDTO> getIssueById(@PathVariable Long id,
                                              @AuthenticationPrincipal User currentUser) {
        IssueDTO issue = issueService.getIssueById(id, currentUser);
        return ResponseEntity.ok(issue);
    }

    @GetMapping("/my")
    public ResponseEntity<List<IssueDTO>> getMyIssues(@AuthenticationPrincipal User currentUser) {
        if (!currentUser.isActive_status()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        List<IssueDTO> issueDTOS = issueService.getIssuesForStudent(currentUser);
        return ResponseEntity.ok(issueDTOS);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'HOD', 'STAFF')")
    @GetMapping("/list")
    public ResponseEntity<List<IssueDTO>> getAllIssues(@AuthenticationPrincipal User currentUser) {
        if (currentUser.getRole() == Role.STUDENT) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'HOD', 'STAFF')")
    @PutMapping("/{id}/status")
    public ResponseEntity<Issue> updateStatus(@PathVariable Long id,
                                              @RequestParam IssueStatus status,
                                              @AuthenticationPrincipal User currentUser) {

        if (currentUser.getRole() == Role.STUDENT) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Issue updated = issueService.updateIssueStatus(id, status, currentUser);
        return ResponseEntity.ok(updated);
    }

    // Download attachment
    @GetMapping("/attachments/{id}")
    public ResponseEntity<ByteArrayResource> downloadAttachment(@PathVariable Long id,
                                                                @AuthenticationPrincipal User currentUser) {
        IssueAttachment att = issueService.getAttachment(id);

        // ensure current user can access the parent issue
        issueService.getIssueById(att.getIssue().getId(), currentUser);

        ByteArrayResource resource = new ByteArrayResource(att.getFileData());
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(att.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + att.getFileName() + "\"")
                .body(resource);
    }

    // Filter by status
    @GetMapping("/filter")
    public ResponseEntity<List<IssueDTO>> filterByStatus(@RequestParam IssueStatus status,
                                                      @AuthenticationPrincipal User currentUser) {
        if (currentUser.getRole() == Role.STUDENT) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(issueService.filterIssuesByStatus(status));
    }

    @GetMapping("/global")
    public ResponseEntity<List<IssueDTO>> filterGlobalIssue(@AuthenticationPrincipal User currentUser){
        if (!currentUser.isActive_status()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(issueService.filterGlobalIssue());
    }

//    @GetMapping("/department/{department}")
//    public ResponseEntity<List<Issue>> getIssuesByDepartment(
//            @PathVariable Department department) {
//
//        List<Issue> issues = issueService.getIssuesByDepartment(department);
//        return ResponseEntity.ok(issues);
//    }
}
