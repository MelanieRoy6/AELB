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

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    public List<Media> getAllPublic() {
        return mediaRepository.findAll();
    }

    @PostMapping("/admin/medias/upload")
    public ResponseEntity<Media> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("categorie") CategorieMedia categorie,
            @RequestParam(value = "legende", required = false) String legende
    ) {
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
            Path file = Paths.get("uploads").resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Simple simplification
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/admin/medias/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        mediaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
