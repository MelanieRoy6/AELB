package com.aelb.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;

import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.*;

class FileStorageServiceTest {

    @TempDir
    Path tempDir;

    private FileStorageService fileStorageService;

    @BeforeEach
    void setUp() {
        fileStorageService = new FileStorageService();
        // Redirige le stockage vers le répertoire temporaire de JUnit
        ReflectionTestUtils.setField(fileStorageService, "root", tempDir);
    }

    // -------------------------------------------------------------------------
    // Extensions d'image autorisées
    // -------------------------------------------------------------------------

    @Test
    void save_extensionJpg_préservéeDansLUrl() {
        String url = fileStorageService.save(mockFile("photo.jpg"));
        assertTrue(url.endsWith(".jpg"), "URL attendue avec .jpg, obtenu : " + url);
    }

    @Test
    void save_extensionJpeg_préservéeDansLUrl() {
        String url = fileStorageService.save(mockFile("photo.jpeg"));
        assertTrue(url.endsWith(".jpeg"));
    }

    @Test
    void save_extensionPng_préservéeDansLUrl() {
        String url = fileStorageService.save(mockFile("image.png"));
        assertTrue(url.endsWith(".png"));
    }

    @Test
    void save_extensionGif_préservéeDansLUrl() {
        String url = fileStorageService.save(mockFile("animation.gif"));
        assertTrue(url.endsWith(".gif"));
    }

    @Test
    void save_extensionWebp_préservéeDansLUrl() {
        String url = fileStorageService.save(mockFile("image.webp"));
        assertTrue(url.endsWith(".webp"));
    }

    @Test
    void save_extensionBmp_préservéeDansLUrl() {
        String url = fileStorageService.save(mockFile("image.bmp"));
        assertTrue(url.endsWith(".bmp"));
    }

    @Test
    void save_extensionSvg_préservéeDansLUrl() {
        String url = fileStorageService.save(mockFile("icon.svg"));
        assertTrue(url.endsWith(".svg"));
    }

    // -------------------------------------------------------------------------
    // Extensions non autorisées → rejetées silencieusement (pas d'extension)
    // -------------------------------------------------------------------------

    @Test
    void save_extensionExe_rejetée() {
        String url = fileStorageService.save(mockFile("virus.exe"));
        assertFalse(url.contains(".exe"), "Extension .exe ne doit pas apparaître dans l'URL");
    }

    @Test
    void save_extensionPdf_rejetée() {
        String url = fileStorageService.save(mockFile("document.pdf"));
        assertFalse(url.contains(".pdf"));
    }

    @Test
    void save_sansDot_pasDExtension() {
        String url = fileStorageService.save(mockFile("fichier-sans-extension"));
        // L'URL doit se terminer juste après le UUID, sans point
        String filename = url.replace("/api/medias/files/", "");
        assertFalse(filename.contains("."), "Aucun point attendu dans le nom de fichier");
    }

    // -------------------------------------------------------------------------
    // Gestion des majuscules → converties en minuscules avant validation
    // -------------------------------------------------------------------------

    @Test
    void save_extensionJpgMajuscule_traitéeCommeLowercaseEtAutorisée() {
        String url = fileStorageService.save(mockFile("PHOTO.JPG"));
        assertTrue(url.endsWith(".jpg"), "Extension .JPG doit être normalisée en .jpg");
    }

    @Test
    void save_extensionPngMixte_normaliséeEnMinuscules() {
        String url = fileStorageService.save(mockFile("image.PNG"));
        assertTrue(url.endsWith(".png"));
    }

    // -------------------------------------------------------------------------
    // Format de l'URL retournée
    // -------------------------------------------------------------------------

    @Test
    void save_urlCommenceParLePathAttendu() {
        String url = fileStorageService.save(mockFile("photo.jpg"));
        assertTrue(url.startsWith("/api/medias/files/"),
                "URL doit commencer par /api/medias/files/, obtenu : " + url);
    }

    @Test
    void save_deuxFichiersOnDesNomsDifférents() {
        String url1 = fileStorageService.save(mockFile("photo.jpg"));
        String url2 = fileStorageService.save(mockFile("photo.jpg"));
        assertNotEquals(url1, url2, "Chaque fichier doit obtenir un nom unique (UUID)");
    }

    // -------------------------------------------------------------------------
    // Helper
    // -------------------------------------------------------------------------

    private MockMultipartFile mockFile(String originalFilename) {
        return new MockMultipartFile(
                "file", originalFilename,
                "application/octet-stream",
                "contenu-test".getBytes()
        );
    }
}
