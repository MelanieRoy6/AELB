package com.aelb.repository;

import com.aelb.model.Reservation;
import com.aelb.model.StatutReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r WHERE r.statut = 'CONFIRMEE' AND ((r.dateDebut BETWEEN :start AND :end) OR (r.dateFin BETWEEN :start AND :end))")
    List<Reservation> findConfirmedInPeriod(LocalDateTime start, LocalDateTime end);
    
    List<Reservation> findAllByOrderByDateCreationDesc();
}
