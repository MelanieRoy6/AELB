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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private ReservationService reservationService;

    @Test
    public void testCreateReservation() {
        Reservation res = new Reservation();
        res.setNomDemandeur("Test User");
        res.setEmail("test@test.com");
        res.setDateDebut(LocalDateTime.now());
        res.setDateFin(LocalDateTime.now().plusHours(2));

        when(reservationRepository.save(any(Reservation.class))).thenReturn(res);

        Reservation saved = reservationService.createReservation(res);

        assertEquals(StatutReservation.EN_ATTENTE, saved.getStatut());
        verify(reservationRepository, times(1)).save(res);
        verify(emailService, times(2)).sendEmail(anyString(), anyString(), anyString());
    }
}
