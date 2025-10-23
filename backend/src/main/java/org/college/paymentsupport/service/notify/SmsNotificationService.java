package org.college.paymentsupport.service.notify;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service("smsNotificationService")
public class SmsNotificationService implements NotificationService {
    private final Logger log = LoggerFactory.getLogger(SmsNotificationService.class);

    @Override
    public void notifyIssueCreated(Long issueId, Long studentId, String studentEmail, String message) {
        // stub: integrate Twilio or other provider here
        log.info("SMS notify (stub) for created issue {} to student {}: {}", issueId, studentId, message);
    }

    @Override
    public void notifyIssueStatusChanged(Long issueId, Long studentId, String studentEmail, String message) {
        log.info("SMS notify (stub) for status change {} to student {}: {}", issueId, studentId, message);
    }
}

