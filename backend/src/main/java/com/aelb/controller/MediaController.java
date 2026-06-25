package com.aelb.controller;

import com.aelb.model.CategorieMedia;
import com.aelb.model.Media;
import com.aelb.repository.MediaRepository;
import com.aelb.service.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MediaController {

    private final MediaRepository mediaRepository;
    private final FileStorageService fileStorageService;

    public MediaController(MediaRepository mediaRepository, FileStorageService fileStorageService) {
        this.mediaRepository = mediaRepository;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping("/medias")
    public List<Media> getAllPublic(@RequestParam(required = false) CategorieMedia categorie) {
        if (categorie != null) return mediaRepository.findByCategorieOrderByDateUploadDesc(categorie);
        return mediaRepository.findAll();
    }

    @PostMapping("/admin/medias/upload")
    public ResponseEntity<?> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("categorie") CategorieMedia categorie,
            @RequestParam(value = "legende", required = false) String legende
    ) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Le fichier est vide.");
        }
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return ResponseEntity.badRequest().body("Seules les images sont acceptées (JPG, PNG, WEBP…).");
        }
        if (file.getSize() > 10L * 1024 * 1024) {
            return ResponseEntity.badRequest().body("Le fichier dépasse la limite de 10 Mo.");
        }

        String url = fileStorageService.save(file);
        Media media = new Media();
        media.setUrl(url);
        media.setCategorie(categorie);
        media.setLegende(legende);
        return ResponseEntity.ok(mediaRepository.save(media));
    }

    @GetMapping("/medias/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path filePath = fileStorageService.getFilePath(filename);
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }
            String detectedType = Files.probeContentType(filePath);
            MediaType mediaType = detectedType != null
                    ? MediaType.parseMediaType(detectedType)
                    : MediaType.APPLICATION_OCTET_STREAM;
            return ResponseEntity.ok().contentType(mediaType).body(resource);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/admin/medias/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        mediaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
