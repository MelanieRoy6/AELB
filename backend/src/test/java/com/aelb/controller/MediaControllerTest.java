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

    @Mock
    private MediaRepository mediaRepository;

    @Mock
    private FileStorageService fileStorageService;

    @InjectMocks
    private MediaController mediaController;

    // -------------------------------------------------------------------------
    // upload — règles de validation du fichier
    // -------------------------------------------------------------------------

    @Test
    void upload_fichierVide_retourne400() {
        MockMultipartFile emptyFile = new MockMultipartFile(
                "file", "photo.jpg", "image/jpeg", new byte[0]);

        ResponseEntity<?> response = mediaController.upload(emptyFile, CategorieMedia.GALERIE, null);

        assertEquals(400, response.getStatusCode().value());
        verifyNoInteractions(fileStorageService);
    }

    @Test
    void upload_contentTypeNonImage_retourne400() {
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        when(file.getContentType()).thenReturn("application/pdf");

        ResponseEntity<?> response = mediaController.upload(file, CategorieMedia.GALERIE, null);

        assertEquals(400, response.getStatusCode().value());
        verifyNoInteractions(fileStorageService);
    }

    @Test
    void upload_contentTypeNull_retourne400() {
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        when(file.getContentType()).thenReturn(null);

        ResponseEntity<?> response = mediaController.upload(file, CategorieMedia.GALERIE, null);

        assertEquals(400, response.getStatusCode().value());
    }

    @Test
    void upload_fichierDépassant10Mo_retourne400() {
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        when(file.getContentType()).thenReturn("image/jpeg");
        when(file.getSize()).thenReturn(11L * 1024 * 1024); // 11 Mo

        ResponseEntity<?> response = mediaController.upload(file, CategorieMedia.GALERIE, null);

        assertEquals(400, response.getStatusCode().value());
        verifyNoInteractions(fileStorageService);
    }

    @Test
    void upload_fichierExactement10Mo_accepté() {
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        when(file.getContentType()).thenReturn("image/jpeg");
        when(file.getSize()).thenReturn(10L * 1024 * 1024); // exactement 10 Mo
        when(fileStorageService.save(file)).thenReturn("/api/medias/files/uuid.jpg");
        when(mediaRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        ResponseEntity<?> response = mediaController.upload(file, CategorieMedia.GALERIE, null);

        assertEquals(200, response.getStatusCode().value());
    }

    @Test
    void upload_fichierValide_retourne200AvecLeMedia() {
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        when(file.getContentType()).thenReturn("image/png");
        when(file.getSize()).thenReturn(500_000L);
        when(fileStorageService.save(file)).thenReturn("/api/medias/files/uuid.png");
        Media savedMedia = new Media();
        savedMedia.setUrl("/api/medias/files/uuid.png");
        when(mediaRepository.save(any())).thenReturn(savedMedia);

        ResponseEntity<?> response = mediaController.upload(file, CategorieMedia.GALERIE, "Une légende");

        assertEquals(200, response.getStatusCode().value());
        assertInstanceOf(Media.class, response.getBody());
    }

    @Test
    void upload_fichierValide_appèleFileStorageService() {
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        when(file.getContentType()).thenReturn("image/jpeg");
        when(file.getSize()).thenReturn(100_000L);
        when(fileStorageService.save(file)).thenReturn("/api/medias/files/uuid.jpg");
        when(mediaRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        mediaController.upload(file, CategorieMedia.GALERIE, null);

        verify(fileStorageService, times(1)).save(file);
    }

    @Test
    void upload_fichierValide_urletCatégorieSauvegardéesDansLeMedia() {
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        when(file.getContentType()).thenReturn("image/webp");
        when(file.getSize()).thenReturn(200_000L);
        when(fileStorageService.save(file)).thenReturn("/api/medias/files/uuid.webp");
        when(mediaRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        mediaController.upload(file, CategorieMedia.GALERIE, "Légende test");

        verify(mediaRepository).save(argThat(media -> {
            Media m = (Media) media;
            return "/api/medias/files/uuid.webp".equals(m.getUrl())
                    && CategorieMedia.GALERIE == m.getCategorie()
                    && "Légende test".equals(m.getLegende());
        }));
    }

    @Test
    void upload_contentTypeImageWebp_accepté() {
        MultipartFile file = mock(MultipartFile.class);
        when(file.isEmpty()).thenReturn(false);
        when(file.getContentType()).thenReturn("image/webp");
        when(file.getSize()).thenReturn(1024L);
        when(fileStorageService.save(file)).thenReturn("/api/medias/files/uuid.webp");
        when(mediaRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        ResponseEntity<?> response = mediaController.upload(file, CategorieMedia.GALERIE, null);

        assertEquals(200, response.getStatusCode().value());
    }
}
