package com.aelb.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;

import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.*;

class FileStorageServiceTest {

    @TempDir Path tempDir;
    private FileStorageService service;

    @BeforeEach
    void setUp() {
        service = new FileStorageService();
        ReflectionTestUtils.setField(service, "root", tempDir);
    }

    @Test
    void save_extensionImageAutorisée_préservéeDansLUrl() {
        // Vérifie que la whitelist laisse passer les formats légitimes
        String url = service.save(mockFile("photo.jpg"));
        assertTrue(url.endsWith(".jpg"));
    }

    @Test
    void save_extensionNonAutorisée_rejetéeSilencieusement() {
        // Un .exe uploadé ne doit laisser aucune trace d'extension dans l'URL
        String url = service.save(mockFile("virus.exe"));
        assertFalse(url.contains(".exe"), "Extension dangereuse ne doit pas apparaître dans l'URL");
    }

    @Test
    void save_extensionMajuscule_normaliséeEtAutorisée() {
        // .JPG doit être traité comme .jpg — la normalisation lowercase est non-évidente
        String url = service.save(mockFile("PHOTO.JPG"));
        assertTrue(url.endsWith(".jpg"));
    }

    private MockMultipartFile mockFile(String filename) {
        return new MockMultipartFile("file", filename, "application/octet-stream", "contenu".getBytes());
    }
}
