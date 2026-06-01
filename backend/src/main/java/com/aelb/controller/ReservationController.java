package com.aelb.controller;

import com.aelb.model.Reservation;
import com.aelb.model.StatutReservation;
import com.aelb.repository.ReservationRepository;
import com.aelb.service.EmailService;
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

    private final ReservationRepository reservationRepository;
    private final EmailService emailService;

    public ReservationController(ReservationRepository reservationRepository, EmailService emailService) {
        this.reservationRepository = reservationRepository;
        this.emailService = emailService;
    }

    @GetMapping("/reservations/disponibilites")
    public List<Map<String, LocalDateTime>> getDisponibilites(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to
    ) {
        return reservationRepository.findConfirmedInPeriod(from, to).stream()
                .map(r -> Map.of("start", r.getDateDebut(), "end", r.getDateFin()))
                .collect(Collectors.toList());
    }

    @PostMapping("/reservations")
    public Reservation createReservation(@RequestBody Reservation reservation) {
        reservation.setStatut(StatutReservation.EN_ATTENTE);
        Reservation saved = reservationRepository.save(reservation);

        // Notify User
        emailService.sendEmail(saved.getEmail(), "Demande de réservation reçue", 
            "Bonjour " + saved.getNomDemandeur() + ",\nvotre demande pour le " + saved.getDateDebut() + " est en cours de traitement.");
        
        // Notify Admin
        emailService.sendEmail("admin@aelbrains.com", "Nouvelle demande de réservation", 
            "Une nouvelle demande a été soumise par " + saved.getNomDemandeur());

        return saved;
    }

    @GetMapping("/admin/reservations")
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAllByOrderByDateCreationDesc();
    }

    @PutMapping("/admin/reservations/{id}/statut")
    public ResponseEntity<Reservation> updateStatut(
            @PathVariable Long id, 
            @RequestBody Map<String, String> statusUpdate
    ) {
        StatutReservation newStatut = StatutReservation.valueOf(statusUpdate.get("statut"));
        String commentaire = statusUpdate.get("commentaire");

        return reservationRepository.findById(id)
                .map(r -> {
                    r.setStatut(newStatut);
                    r.setCommentaireAdmin(commentaire);
                    Reservation saved = reservationRepository.save(r);

                    String subject = newStatut == StatutReservation.CONFIRMEE ? "Réservation Confirmée" : "Réservation Refusée";
                    String message = "Votre demande de réservation pour le " + r.getDateDebut() + " a été " + newStatut.toString().toLowerCase() + ".";
                    if (commentaire != null) message += "\nCommentaire admin : " + commentaire;

                    emailService.sendEmail(r.getEmail(), subject, message);

                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
