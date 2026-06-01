package com.aelb.controller;

import com.aelb.model.MembreEquipe;
import com.aelb.repository.MembreEquipeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MembreEquipeController {

    private final MembreEquipeRepository membreEquipeRepository;

    public MembreEquipeController(MembreEquipeRepository membreEquipeRepository) {
        this.membreEquipeRepository = membreEquipeRepository;
    }

    @GetMapping("/equipe")
    public List<MembreEquipe> getPublicEquipe() {
        return membreEquipeRepository.findAllByOrderByOrdreAsc();
    }

    @GetMapping("/admin/equipe")
    public List<MembreEquipe> getAllAdmin() {
        return membreEquipeRepository.findAll();
    }

    @PostMapping("/admin/equipe")
    public MembreEquipe create(@RequestBody MembreEquipe membre) {
        return membreEquipeRepository.save(membre);
    }

    @PutMapping("/admin/equipe/{id}")
    public ResponseEntity<MembreEquipe> update(@PathVariable Long id, @RequestBody MembreEquipe details) {
        return membreEquipeRepository.findById(id)
                .map(m -> {
                    m.setNom(details.getNom());
                    m.setPrenom(details.getPrenom());
                    m.setRole(details.getRole());
                    m.setBio(details.getBio());
                    m.setPhotoUrl(details.getPhotoUrl());
                    m.setOrdre(details.getOrdre());
                    return ResponseEntity.ok(membreEquipeRepository.save(m));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/equipe/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        membreEquipeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
