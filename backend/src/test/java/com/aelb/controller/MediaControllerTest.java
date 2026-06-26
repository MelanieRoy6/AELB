package com.aelb.controller;

import com.aelb.model.CategorieMedia;
import com.aelb.model.Media;
import com.aelb.repository.MediaRepository;
import com.aelb.service.FileStorageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MediaControllerTest {

    @Mock private MediaRepository mediaRepository;
    @Mock private FileStorageService fileStorageService;
    @InjectMocks private MediaController mediaController;

    @Test
    void upload_fichierVide_retourne400() {
        MockMultipartFile empty = new MockMultipartFile("file", "photo.jpg", "image/jpeg", new byte[0]);

        assertEquals(400, mediaController.upload(empty, CategorieMedia.GALERIE, null).getStatusCode().value());
        verifyNoInteractions(fileStorageService);
    }

    @Test
    void upload_contentTypeNonImage_retourne400() {
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        when(file.getContentType()).thenReturn("application/pdf");

        assertEquals(400, mediaController.upload(file, CategorieMedia.GALERIE, null).getStatusCode().value());
        verifyNoInteractions(fileStorageService);
    }

    @Test
    void upload_fichierDépassant10Mo_retourne400() {
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        when(file.getContentType()).thenReturn("image/jpeg");
        when(file.getSize()).thenReturn(11L * 1024 * 1024);

        assertEquals(400, mediaController.upload(file, CategorieMedia.GALERIE, null).getStatusCode().value());
        verifyNoInteractions(fileStorageService);
    }

    @Test
    void upload_fichierValide_retourne200AvecLeMediaSauvegardé() {
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        when(file.getContentType()).thenReturn("image/jpeg");
        when(file.getSize()).thenReturn(500_000L);
        when(fileStorageService.save(file)).thenReturn("/api/medias/files/uuid.jpg");
        when(mediaRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        ResponseEntity<?> response = mediaController.upload(file, CategorieMedia.GALERIE, "Une légende");

        assertEquals(200, response.getStatusCode().value());
        assertInstanceOf(Media.class, response.getBody());
    }
}
