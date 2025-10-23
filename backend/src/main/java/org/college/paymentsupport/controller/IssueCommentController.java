package org.college.paymentsupport.controller;

import org.college.paymentsupport.dto.IssueCommentDTO;
import org.college.paymentsupport.entity.User;
import org.college.paymentsupport.service.IssueCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/comment")
public class IssueCommentController {

    @Autowired
    private final IssueCommentService issueCommentService;

    public IssueCommentController(IssueCommentService issueCommentService) {
        this.issueCommentService = issueCommentService;
    }

    @PostMapping(value = "/create")
    private ResponseEntity<IssueCommentDTO> createIssueComment(
            @AuthenticationPrincipal User currentUser,
            @RequestParam String content,
            @RequestParam Long issueId) throws IOException {

        IssueCommentDTO saveComment = issueCommentService.saveIssueComment(issueId, content, currentUser.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(saveComment);
    }
}
