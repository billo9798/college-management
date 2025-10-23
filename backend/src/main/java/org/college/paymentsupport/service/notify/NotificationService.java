package org.college.paymentsupport.service.notify;

public interface NotificationService {
    void notifyIssueCreated(Long issueId, Long studentId, String studentEmail, String message);
    void notifyIssueStatusChanged(Long issueId, Long studentId, String studentEmail, String message);
}

