package com.zchadli.ecommerce_back.repository;

import com.zchadli.ecommerce_back.model.UploadedFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadedFileDao extends JpaRepository<UploadedFile, Long> {
}
