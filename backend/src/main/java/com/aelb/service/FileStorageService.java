package com.aelb.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Logger log = LoggerFactory.getLogger(FileStorageService.class);
    private final Path root = Paths.get("uploads").toAbsolutePath().normalize();

    public FileStorageService() {
        try {
            Files.createDirectories(root);
            log.info("[FileStorageService] Dossier uploads : {}", root);
        } catch (IOException e) {
            throw new RuntimeException("Impossible de créer le dossier uploads : " + e.getMessage());
        }
    }

    public String save(MultipartFile file) {
        try {
            String extension = extractExtension(file.getOriginalFilename());
            String filename = UUID.randomUUID() + extension;
            Path destination = root.resolve(filename);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
            log.info("[FileStorageService] Fichier sauvegardé : {}", destination);
            return "/api/medias/files/" + filename;
        } catch (Exception e) {
            log.error("[FileStorageService] Erreur sauvegarde : {}", e.getMessage());
            throw new RuntimeException("Impossible de sauvegarder le fichier : " + e.getMessage());
        }
    }

    public Path getFilePath(String filename) {
        return root.resolve(filename).normalize();
    }

    private String extractExtension(String originalFilename) {
        if (originalFilename == null || !originalFilename.contains(".")) return "";
        String ext = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
        // N'autorise que les extensions d'image connues
        return ext.matches("\\.(jpg|jpeg|png|gif|webp|bmp|svg)") ? ext : "";
    }
}
