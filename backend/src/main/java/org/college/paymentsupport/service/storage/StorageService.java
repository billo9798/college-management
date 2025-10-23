package org.college.paymentsupport.service.storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {
    byte[] readBytes(MultipartFile file) throws IOException;
    String detectContentType(MultipartFile file);
}

