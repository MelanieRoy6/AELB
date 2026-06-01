package com.aelb.controller;

import com.aelb.model.Evenement;
import com.aelb.repository.EvenementRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class EvenementController {

    private final EvenementRepository evenementRepository;

    public EvenementController(EvenementRepository evenementRepository) {
        this.evenementRepository = evenementRepository;
    }

    @GetMapping("/evenements")
    public Page<Evenement> getEvenements(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        LocalDateTime start = (from != null) ? from : LocalDateTime.now().minusYears(1);
        LocalDateTime end = (to != null) ? to : LocalDateTime.now().plusYears(1);
        return evenementRepository.findByDateDebutBetweenAndPublieTrue(start, end, PageRequest.of(page, size));
    }

    @GetMapping("/evenements/upcoming")
    public List<Evenement> getUpcomingEvenements() {
        return evenementRepository.findUpcomingEvents(PageRequest.of(0, 5));
    }

    @PostMapping("/admin/evenements")
    public Evenement createEvenement(@RequestBody Evenement evenement) {
        return evenementRepository.save(evenement);
    }

    @PutMapping("/admin/evenements/{id}")
    public ResponseEntity<Evenement> updateEvenement(@PathVariable Long id, @RequestBody Evenement details) {
        return evenementRepository.findById(id)
                .map(e -> {
                    e.setTitre(details.getTitre());
                    e.setDescription(details.getDescription());
                    e.setDateDebut(details.getDateDebut());
                    e.setDateFin(details.getDateFin());
                    e.setType(details.getType());
                    e.setImageUrl(details.getImageUrl());
                    e.setPublie(details.isPublie());
                    return ResponseEntity.ok(evenementRepository.save(e));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/evenements/{id}")
    public ResponseEntity<Void> deleteEvenement(@PathVariable Long id) {
        if (evenementRepository.existsById(id)) {
            evenementRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
