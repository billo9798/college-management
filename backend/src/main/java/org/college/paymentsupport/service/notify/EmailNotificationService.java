package org.college.paymentsupport.service.notify;

import org.springframework.context.annotation.Primary;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service("emailNotificationService")
//@ConditionalOnProperty(prefix = "notify.email", name = "enabled", havingValue = "true", matchIfMissing = true)
@Primary
public class EmailNotificationService implements NotificationService {

    private final JavaMailSender mailSender;

    public EmailNotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void notifyIssueCreated(Long issueId, Long studentId, String studentEmail, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(studentEmail);
        mail.setSubject("Issue Created: #" + issueId);
        mail.setText(message);
        mailSender.send(mail);
    }

    @Override
    public void notifyIssueStatusChanged(Long issueId, Long studentId, String studentEmail, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(studentEmail);
        mail.setSubject("Issue Status Updated: #" + issueId);
        mail.setText(message);
        mailSender.send(mail);
    }
}

