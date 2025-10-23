package org.college.paymentsupport.repository;

import org.college.paymentsupport.entity.IssueType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IssueTypeRepository extends JpaRepository<IssueType, Long> {
    Optional<IssueType> findByCode(String code);
}

