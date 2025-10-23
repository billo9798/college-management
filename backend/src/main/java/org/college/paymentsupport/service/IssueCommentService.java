package org.college.paymentsupport.service;

import jakarta.transaction.Transactional;
import org.college.paymentsupport.dto.IssueCommentDTO;
import org.college.paymentsupport.entity.Issue;
import org.college.paymentsupport.entity.IssueComment;
import org.college.paymentsupport.entity.User;
import org.college.paymentsupport.exception.NotFoundException;
import org.college.paymentsupport.repository.IssueCommentRepository;
import org.college.paymentsupport.repository.IssueRepository;
import org.college.paymentsupport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Transactional
public class IssueCommentService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private IssueCommentRepository issueCommentRepository;

    //Create Comment on the issue.
    public IssueCommentDTO saveIssueComment(Long issueId, String content, Long createdBy) {

        User createdUser = userRepository.findById(createdBy)
                .orElseThrow(() -> new NotFoundException("Student not found"));

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new NotFoundException("Issue not found"));

        IssueComment issueComment = new IssueComment();
        issueComment.setCreatedBy(createdUser);
        issueComment.setIssue(issue);
        issueComment.setContent(content);
        issueComment.setCreatedAt(LocalDateTime.now());
        IssueComment savedComment = issueCommentRepository.save(issueComment);

        return IssueCommentDTO.mapToDto(savedComment);
    }
}
