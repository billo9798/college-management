package org.college.paymentsupport.service.storage;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileSystemStorageService implements StorageService {

    @Override
    public byte[] readBytes(MultipartFile file) throws IOException {
        return file.getBytes();
    }

    @Override
    public String detectContentType(MultipartFile file) {
        String ct = file.getContentType();
        return ct != null ? ct : "application/octet-stream";
    }
}

