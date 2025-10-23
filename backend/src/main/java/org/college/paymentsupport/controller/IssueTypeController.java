package org.college.paymentsupport.controller;

import org.college.paymentsupport.entity.IssueType;
import org.college.paymentsupport.repository.IssueTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issue-types")
public class IssueTypeController {

    @Autowired
    private IssueTypeRepository issueTypeRepository;

    @GetMapping
    public ResponseEntity<List<IssueType>> getAllIssueTypes() {
        return ResponseEntity.ok(issueTypeRepository.findAll());
    }
}

