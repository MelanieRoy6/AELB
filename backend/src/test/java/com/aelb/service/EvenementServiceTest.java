package com.aelb.service;

import com.aelb.repository.EvenementRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EvenementServiceTest {

    @Mock private EvenementRepository evenementRepository;
    @InjectMocks private EvenementService evenementService;

    @Test
    void findById_idInexistant_leveRuntimeExceptionAvecMessagePrécis() {
        // Le message est utilisé par le frontend pour afficher l'erreur — il ne doit pas changer
        when(evenementRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> evenementService.findById(99L));
        assertEquals("Événement non trouvé", ex.getMessage());
    }
}
