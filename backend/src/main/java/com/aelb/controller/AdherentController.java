package com.aelb.controller;

import com.aelb.model.Adherent;
import com.aelb.repository.AdherentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/adherents")
public class AdherentController {

    private final AdherentRepository adherentRepository;

    public AdherentController(AdherentRepository adherentRepository) {
        this.adherentRepository = adherentRepository;
    }

    @GetMapping
    public List<Adherent> getAll() {
        return adherentRepository.findAll();
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
}
