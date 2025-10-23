package org.college.paymentsupport.repository;

import org.college.paymentsupport.entity.Department;
import org.college.paymentsupport.entity.Issue;
import org.college.paymentsupport.entity.IssueStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByStudentId(Long studentId);
    List<Issue> findByStatus(IssueStatus status);
    List<Issue> findByGlobalIssueTrue();
//    List<Issue> findByIssueType_Department(Department department);
}

