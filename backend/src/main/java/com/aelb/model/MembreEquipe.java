package com.aelb.model;

import jakarta.persistence.*;

@Entity
@Table(name = "membres_equipe")
public class MembreEquipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    private String role;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "ordre_affichage")
    private Integer ordre;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    public Integer getOrdre() { return ordre; }
    public void setOrdre(Integer ordre) { this.ordre = ordre; }
}
