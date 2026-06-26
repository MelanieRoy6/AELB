package com.aelb.service;

import com.aelb.model.Reservation;
import com.aelb.model.StatutReservation;
import com.aelb.repository.ReservationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock private ReservationRepository reservationRepository;
    @Mock private EmailService emailService;
    @InjectMocks private ReservationService reservationService;

    @Test
    void createReservation_statutForcéEnAttente() {
        // Le frontend peut envoyer n'importe quel statut — le service doit l'écraser
        Reservation res = buildReservation();
        res.setStatut(StatutReservation.CONFIRMEE);
        when(reservationRepository.save(any())).thenReturn(res);

        assertEquals(StatutReservation.EN_ATTENTE, reservationService.createReservation(res).getStatut());
    }

    @Test
    void createAdminReservation_statutForcéConfirmée() {
        // Création admin = confirmée immédiatement, sans workflow
        Reservation res = buildReservation();
        when(reservationRepository.save(any())).thenReturn(res);

        assertEquals(StatutReservation.CONFIRMEE, reservationService.createAdminReservation(res).getStatut());
    }

    @Test
    void createReservation_échecSMTP_réservationQuandMêmeSauvegardée() {
        // L'email est non-bloquant : une panne SMTP ne doit pas annuler la réservation
        Reservation res = buildReservation();
        when(reservationRepository.save(any())).thenReturn(res);
        doThrow(new RuntimeException("SMTP indisponible")).when(emailService).sendEmail(anyString(), anyString(), anyString());

        assertDoesNotThrow(() -> reservationService.createReservation(res));
        verify(reservationRepository).save(res);
    }

    @Test
    void updateStatut_confirmée_sujetEmailCorrect() {
        // Le texte exact du sujet conditionne l'expérience utilisateur
        Reservation existing = buildReservation();
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(reservationRepository.save(any())).thenReturn(existing);

        reservationService.updateStatut(1L, StatutReservation.CONFIRMEE, null);

        verify(emailService).sendEmail(anyString(), eq("Réservation confirmée"), anyString());
    }

    @Test
    void updateStatut_idInexistant_leveNoSuchElementException() {
        when(reservationRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class,
                () -> reservationService.updateStatut(99L, StatutReservation.CONFIRMEE, null));
    }

    private Reservation buildReservation() {
        Reservation r = new Reservation();
        r.setNomDemandeur("Jean Dupont");
        r.setEmail("demandeur@test.com");
        r.setDateDebut(LocalDateTime.now().plusDays(1));
        r.setDateFin(LocalDateTime.now().plusDays(1).plusHours(2));
        r.setStatut(StatutReservation.EN_ATTENTE);
        return r;
    }
}
