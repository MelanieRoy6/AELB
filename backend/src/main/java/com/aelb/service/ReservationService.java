package com.aelb.service;

import com.aelb.model.Reservation;
import com.aelb.model.StatutReservation;
import com.aelb.repository.ReservationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final EmailService emailService;

    public ReservationService(ReservationRepository reservationRepository, EmailService emailService) {
        this.reservationRepository = reservationRepository;
        this.emailService = emailService;
    }

    public List<Reservation> getConfirmedInPeriod(LocalDateTime start, LocalDateTime end) {
        return reservationRepository.findConfirmedInPeriod(start, end);
    }

    public Reservation createReservation(Reservation reservation) {
        reservation.setStatut(StatutReservation.EN_ATTENTE);
        Reservation saved = reservationRepository.save(reservation);
        
        emailService.sendEmail(saved.getEmail(), "Demande reçue", "Bonjour " + saved.getNomDemandeur() + ", votre demande est en attente.");
        emailService.sendEmail("admin@aelbrains.com", "Nouvelle demande", "Nouvelle demande de " + saved.getNomDemandeur());
        
        return saved;
    }

    public List<Reservation> getAll() {
        return reservationRepository.findAllByOrderByDateCreationDesc();
    }

    public Reservation updateStatut(Long id, StatutReservation statut, String commentaire) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow();
        reservation.setStatut(statut);
        reservation.setCommentaireAdmin(commentaire);
        Reservation saved = reservationRepository.save(reservation);

        String subject = statut == StatutReservation.CONFIRMEE ? "Réservation Confirmée" : "Réservation Refusée";
        emailService.sendEmail(saved.getEmail(), subject, "Votre demande est " + statut);

        return saved;
    }
}
