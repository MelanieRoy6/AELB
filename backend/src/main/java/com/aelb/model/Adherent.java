package com.aelb.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "adherents")
public class Adherent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false, unique = true)
    private String email;

    private String telephone;

    private String section;

    @Column(name = "date_adhesion")
    private LocalDate dateAdhesion;

    private boolean actif;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }
    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }
    public LocalDate getDateAdhesion() { return dateAdhesion; }
    public void setDateAdhesion(LocalDate dateAdhesion) { this.dateAdhesion = dateAdhesion; }
    public boolean isActif() { return actif; }
    public void setActif(boolean actif) { this.actif = actif; }
}
