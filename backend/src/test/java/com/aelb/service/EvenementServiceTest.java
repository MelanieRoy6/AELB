package com.aelb.service;

import com.aelb.model.Evenement;
import com.aelb.model.TypeEvenement;
import com.aelb.repository.EvenementRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EvenementServiceTest {

    @Mock
    private EvenementRepository evenementRepository;

    @InjectMocks
    private EvenementService evenementService;

    // -------------------------------------------------------------------------
    // getEvents — filtre publie=true + plage de dates
    // -------------------------------------------------------------------------

    @Test
    void getEvents_délègueAvecLaBonnePlageDeDates() {
        LocalDateTime start = LocalDateTime.now().minusDays(1);
        LocalDateTime end = LocalDateTime.now().plusDays(7);
        Pageable pageable = PageRequest.of(0, 10);
        Page<Evenement> expected = new PageImpl<>(List.of(buildEvenement()));
        when(evenementRepository.findByDateDebutBetweenAndPublieTrue(start, end, pageable))
                .thenReturn(expected);

        Page<Evenement> result = evenementService.getEvents(start, end, pageable);

        assertEquals(expected, result);
        verify(evenementRepository).findByDateDebutBetweenAndPublieTrue(start, end, pageable);
    }

    @Test
    void getEvents_pageVide_siAucunEvenementDansLaPériode() {
        LocalDateTime start = LocalDateTime.now();
        LocalDateTime end = start.plusDays(1);
        Pageable pageable = PageRequest.of(0, 10);
        when(evenementRepository.findByDateDebutBetweenAndPublieTrue(start, end, pageable))
                .thenReturn(Page.empty());

        Page<Evenement> result = evenementService.getEvents(start, end, pageable);

        assertTrue(result.isEmpty());
    }

    // -------------------------------------------------------------------------
    // getUpcomingEvents — prochains événements publiés triés ASC
    // -------------------------------------------------------------------------

    @Test
    void getUpcomingEvents_délègueAuRepositoryAvecLaLimite() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Evenement> expected = List.of(buildEvenement());
        when(evenementRepository.findUpcomingEvents(pageable)).thenReturn(expected);

        List<Evenement> result = evenementService.getUpcomingEvents(pageable);

        assertEquals(expected, result);
        verify(evenementRepository).findUpcomingEvents(pageable);
    }

    // -------------------------------------------------------------------------
    // findById
    // -------------------------------------------------------------------------

    @Test
    void findById_retourneLEvenementTrouvé() {
        Evenement e = buildEvenement();
        when(evenementRepository.findById(1L)).thenReturn(Optional.of(e));

        Evenement result = evenementService.findById(1L);

        assertEquals(e, result);
    }

    @Test
    void findById_idInexistant_leveRuntimeException() {
        when(evenementRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> evenementService.findById(99L));
        assertEquals("Événement non trouvé", ex.getMessage());
    }

    // -------------------------------------------------------------------------
    // save
    // -------------------------------------------------------------------------

    @Test
    void save_délègueAuRepositoryEtRetourneLEvenement() {
        Evenement e = buildEvenement();
        when(evenementRepository.save(e)).thenReturn(e);

        Evenement result = evenementService.save(e);

        assertEquals(e, result);
        verify(evenementRepository).save(e);
    }

    // -------------------------------------------------------------------------
    // delete
    // -------------------------------------------------------------------------

    @Test
    void delete_délègueAuRepositoryParId() {
        evenementService.delete(42L);

        verify(evenementRepository).deleteById(42L);
    }

    // -------------------------------------------------------------------------
    // Helper
    // -------------------------------------------------------------------------

    private Evenement buildEvenement() {
        Evenement e = new Evenement();
        e.setTitre("Concert AELB");
        e.setType(TypeEvenement.CONCERT);
        e.setDateDebut(LocalDateTime.now().plusDays(10));
        e.setPublie(true);
        return e;
    }
}
