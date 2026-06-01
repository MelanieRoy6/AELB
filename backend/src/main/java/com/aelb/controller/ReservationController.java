package com.aelb.controller;

import com.aelb.model.Reservation;
import com.aelb.model.StatutReservation;
import com.aelb.service.ReservationService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/reservations/disponibilites")
    public List<Map<String, LocalDateTime>> getDisponibilites(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to
    ) {
        return reservationService.getConfirmedInPeriod(from, to).stream()
                .map(r -> Map.of("start", r.getDateDebut(), "end", r.getDateFin()))
                .collect(Collectors.toList());
    }

    @PostMapping("/reservations")
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @GetMapping("/admin/reservations")
    public List<Reservation> getAllReservations() {
        return reservationService.getAll();
    }

    @PutMapping("/admin/reservations/{id}/statut")
    public ResponseEntity<Reservation> updateStatut(
            @PathVariable Long id, 
            @RequestBody Map<String, String> statusUpdate
    ) {
        try {
            StatutReservation newStatut = StatutReservation.valueOf(statusUpdate.get("statut"));
            String commentaire = statusUpdate.get("commentaire");
            return ResponseEntity.ok(reservationService.updateStatut(id, newStatut, commentaire));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
