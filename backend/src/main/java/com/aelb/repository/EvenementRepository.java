package com.aelb.repository;

import com.aelb.model.Evenement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface EvenementRepository extends JpaRepository<Evenement, Long> {
    Page<Evenement> findByDateDebutBetweenAndPublieTrue(LocalDateTime start, LocalDateTime end, Pageable pageable);
    
    @Query("SELECT e FROM Evenement e WHERE e.dateDebut >= CURRENT_TIMESTAMP AND e.publie = true ORDER BY e.dateDebut ASC")
    List<Evenement> findUpcomingEvents(Pageable pageable);
}
