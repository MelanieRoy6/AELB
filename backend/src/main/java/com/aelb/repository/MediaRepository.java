package com.aelb.repository;

import com.aelb.model.CategorieMedia;
import com.aelb.model.Media;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Long> {
    List<Media> findByCategorieOrderByDateUploadDesc(CategorieMedia categorie);
}
