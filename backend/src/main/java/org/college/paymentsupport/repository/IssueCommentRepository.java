package org.college.paymentsupport.repository;

import org.college.paymentsupport.entity.IssueComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueCommentRepository extends JpaRepository<IssueComment, Long> {
}
