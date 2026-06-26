package com.aelb.repository;

import com.aelb.model.Adherent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface AdherentRepository extends JpaRepository<Adherent, Long> {
    Optional<Adherent> findByEmail(String email);

    @Query("SELECT a.email FROM Adherent a WHERE a.actif = true")
    List<String> findAllActiveEmails();
}
