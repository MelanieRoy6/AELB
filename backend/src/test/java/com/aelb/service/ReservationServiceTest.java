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
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private ReservationService reservationService;

    // -------------------------------------------------------------------------
    // createReservation
    // -------------------------------------------------------------------------

    @Test
    void createReservation_statutForcéEnAttente() {
        Reservation res = buildReservation();
        res.setStatut(StatutReservation.CONFIRMEE);
        when(reservationRepository.save(any())).thenReturn(res);

        Reservation result = reservationService.createReservation(res);

        assertEquals(StatutReservation.EN_ATTENTE, result.getStatut());
    }

    @Test
    void createReservation_deuxEmailsEnvoyés() {
        Reservation res = buildReservation();
        when(reservationRepository.save(any())).thenReturn(res);

        reservationService.createReservation(res);

        verify(emailService, times(2)).sendEmail(anyString(), anyString(), anyString());
    }

    @Test
    void createReservation_emailEnvoyéAuDemandeur() {
        Reservation res = buildReservation();
        when(reservationRepository.save(any())).thenReturn(res);

        reservationService.createReservation(res);

        verify(emailService).sendEmail(eq("demandeur@test.com"), anyString(), anyString());
    }

    @Test
    void createReservation_emailEnvoyéÀLAdmin() {
        Reservation res = buildReservation();
        when(reservationRepository.save(any())).thenReturn(res);

        reservationService.createReservation(res);

        verify(emailService).sendEmail(eq("admin@aelbrains.com"), anyString(), anyString());
    }

    @Test
    void createReservation_échecEmailNonBloquant() {
        Reservation res = buildReservation();
        when(reservationRepository.save(any())).thenReturn(res);
        doThrow(new RuntimeException("SMTP indisponible"))
                .when(emailService).sendEmail(anyString(), anyString(), anyString());

        assertDoesNotThrow(() -> reservationService.createReservation(res));
        verify(reservationRepository, times(1)).save(res);
    }

    @Test
    void createReservation_réservationSauvegardéeMêmeSiEmailÉchoue() {
        Reservation res = buildReservation();
        when(reservationRepository.save(any())).thenReturn(res);
        doThrow(new RuntimeException("SMTP")).when(emailService).sendEmail(anyString(), anyString(), anyString());

        reservationService.createReservation(res);

        verify(reservationRepository, times(1)).save(res);
    }

    // -------------------------------------------------------------------------
    // createAdminReservation
    // -------------------------------------------------------------------------

    @Test
    void createAdminReservation_statutForcéConfirmée() {
        Reservation res = buildReservation();
        res.setStatut(StatutReservation.EN_ATTENTE);
        when(reservationRepository.save(any())).thenReturn(res);

        Reservation result = reservationService.createAdminReservation(res);

        assertEquals(StatutReservation.CONFIRMEE, result.getStatut());
    }

    @Test
    void createAdminReservation_aucunEmailEnvoyé() {
        Reservation res = buildReservation();
        when(reservationRepository.save(any())).thenReturn(res);

        reservationService.createAdminReservation(res);

        verifyNoInteractions(emailService);
    }

    // -------------------------------------------------------------------------
    // updateStatut
    // -------------------------------------------------------------------------

    @Test
    void updateStatut_metAJourLEStatut() {
        Reservation existing = buildReservation();
        existing.setStatut(StatutReservation.EN_ATTENTE);
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(reservationRepository.save(any())).thenReturn(existing);

        Reservation result = reservationService.updateStatut(1L, StatutReservation.CONFIRMEE, null);

        assertEquals(StatutReservation.CONFIRMEE, result.getStatut());
    }

    @Test
    void updateStatut_metAJourLeCommentaireAdmin() {
        Reservation existing = buildReservation();
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(reservationRepository.save(any())).thenReturn(existing);

        Reservation result = reservationService.updateStatut(1L, StatutReservation.CONFIRMEE, "Salle disponible");

        assertEquals("Salle disponible", result.getCommentaireAdmin());
    }

    @Test
    void updateStatut_confirmée_sujetEmailCorrect() {
        Reservation existing = buildReservation();
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(reservationRepository.save(any())).thenReturn(existing);

        reservationService.updateStatut(1L, StatutReservation.CONFIRMEE, null);

        verify(emailService).sendEmail(anyString(), eq("Réservation confirmée"), anyString());
    }

    @Test
    void updateStatut_refusée_sujetEmailCorrect() {
        Reservation existing = buildReservation();
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(reservationRepository.save(any())).thenReturn(existing);

        reservationService.updateStatut(1L, StatutReservation.REFUSEE, "Indisponible");

        verify(emailService).sendEmail(anyString(), eq("Réservation refusée"), anyString());
    }

    @Test
    void updateStatut_échecEmailNonBloquant() {
        Reservation existing = buildReservation();
        when(reservationRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(reservationRepository.save(any())).thenReturn(existing);
        doThrow(new RuntimeException("SMTP")).when(emailService).sendEmail(anyString(), anyString(), anyString());

        assertDoesNotThrow(() -> reservationService.updateStatut(1L, StatutReservation.CONFIRMEE, null));
    }

    @Test
    void updateStatut_idInexistant_leveNoSuchElementException() {
        when(reservationRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class,
                () -> reservationService.updateStatut(99L, StatutReservation.CONFIRMEE, null));
    }

    // -------------------------------------------------------------------------
    // getConfirmedInPeriod
    // -------------------------------------------------------------------------

    @Test
    void getConfirmedInPeriod_délègueAuRepository() {
        LocalDateTime start = LocalDateTime.now();
        LocalDateTime end = start.plusDays(7);
        List<Reservation> expected = List.of(buildReservation());
        when(reservationRepository.findConfirmedInPeriod(start, end)).thenReturn(expected);

        List<Reservation> result = reservationService.getConfirmedInPeriod(start, end);

        assertEquals(expected, result);
        verify(reservationRepository).findConfirmedInPeriod(start, end);
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

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
