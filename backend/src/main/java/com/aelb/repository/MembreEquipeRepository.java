package com.aelb.repository;

import com.aelb.model.MembreEquipe;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MembreEquipeRepository extends JpaRepository<MembreEquipe, Long> {
    List<MembreEquipe> findAllByOrderByOrdreAsc();
}
