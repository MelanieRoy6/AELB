package com.aelb.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "medias")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url;

    private String legende;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategorieMedia categorie;

    @Column(name = "date_upload")
    private LocalDateTime dateUpload;

    @PrePersist
    protected void onCreate() {
        dateUpload = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getLegende() { return legende; }
    public void setLegende(String legende) { this.legende = legende; }
    public CategorieMedia getCategorie() { return categorie; }
    public void setCategorie(CategorieMedia categorie) { this.categorie = categorie; }
    public LocalDateTime getDateUpload() { return dateUpload; }
    public void setDateUpload(LocalDateTime dateUpload) { this.dateUpload = dateUpload; }
}
