package com.aelb.controller;

import com.aelb.model.Adherent;
import com.aelb.repository.AdherentRepository;
import com.aelb.service.AdherentService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/adherents")
public class AdherentController {

    private final AdherentRepository adherentRepository;
    private final AdherentService adherentService;

    public AdherentController(AdherentRepository adherentRepository, AdherentService adherentService) {
        this.adherentRepository = adherentRepository;
        this.adherentService = adherentService;
    }

    @GetMapping
    public List<Adherent> getAll() {
        return adherentRepository.findAll();
    }

    @GetMapping("/emails")
    public List<String> getEmails() {
        return adherentRepository.findAllActiveEmails();
    }

    @PostMapping
    public Adherent create(@RequestBody Adherent adherent) {
        return adherentRepository.save(adherent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Adherent> update(@PathVariable Long id, @RequestBody Adherent details) {
        return adherentRepository.findById(id)
                .map(a -> {
                    a.setNom(details.getNom());
                    a.setPrenom(details.getPrenom());
                    a.setEmail(details.getEmail());
                    a.setTelephone(details.getTelephone());
                    a.setSection(details.getSection());
                    a.setDateAdhesion(details.getDateAdhesion());
                    a.setDateNaissance(details.getDateNaissance());
                    a.setAnneeAdhesion(details.getAnneeAdhesion());
                    a.setCotisationPayee(details.isCotisationPayee());
                    a.setAnneeCotisation(details.getAnneeCotisation());
                    a.setActif(details.isActif());
                    return ResponseEntity.ok(adherentRepository.save(a));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        adherentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/import")
    public ResponseEntity<?> importExcel(@RequestParam("file") MultipartFile file) {
        try {
            List<Adherent> imported = adherentService.importFromExcel(file);
            return ResponseEntity.ok(Map.of("imported", imported.size()));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Erreur lors de l'import : " + e.getMessage()));
        }
    }

    @GetMapping("/export/excel")
    public ResponseEntity<byte[]> exportExcel() {
        try {
            byte[] data = adherentService.exportToExcel();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=adherents_aelb.xlsx")
                    .contentType(MediaType.parseMediaType(
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(data);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/email-groupe")
    public ResponseEntity<?> sendBulkEmail(@RequestBody Map<String, String> body) {
        String sujet = body.get("sujet");
        String corps = body.get("corps");
        if (sujet == null || corps == null || sujet.isBlank() || corps.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Sujet et corps requis"));
        }
        adherentService.sendBulkEmail(sujet, corps);
        return ResponseEntity.ok(Map.of("message", "Emails envoyés avec succès"));
    }
}
