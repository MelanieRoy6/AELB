package com.aelb.controller;

import com.aelb.repository.AdherentRepository;
import com.aelb.service.AdherentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdherentControllerTest {

    @Mock
    private AdherentRepository adherentRepository;

    @Mock
    private AdherentService adherentService;

    @InjectMocks
    private AdherentController adherentController;

    // -------------------------------------------------------------------------
    // sendBulkEmail — validation des champs obligatoires
    // -------------------------------------------------------------------------

    @Test
    void sendBulkEmail_sujetAbsent_retourne400() {
        // Seul "corps" fourni, "sujet" absent → null
        Map<String, String> body = new HashMap<>();
        body.put("corps", "Corps valide");

        ResponseEntity<?> response = adherentController.sendBulkEmail(body);

        assertEquals(400, response.getStatusCode().value());
        verifyNoInteractions(adherentService);
    }

    @Test
    void sendBulkEmail_corpsAbsent_retourne400() {
        Map<String, String> body = new HashMap<>();
        body.put("sujet", "Sujet valide");

        ResponseEntity<?> response = adherentController.sendBulkEmail(body);

        assertEquals(400, response.getStatusCode().value());
        verifyNoInteractions(adherentService);
    }

    @Test
    void sendBulkEmail_sujetBlank_retourne400() {
        Map<String, String> body = new HashMap<>();
        body.put("sujet", "   ");
        body.put("corps", "Corps valide");

        ResponseEntity<?> response = adherentController.sendBulkEmail(body);

        assertEquals(400, response.getStatusCode().value());
    }

    @Test
    void sendBulkEmail_corpsBlank_retourne400() {
        Map<String, String> body = new HashMap<>();
        body.put("sujet", "Sujet valide");
        body.put("corps", "");

        ResponseEntity<?> response = adherentController.sendBulkEmail(body);

        assertEquals(400, response.getStatusCode().value());
    }

    @Test
    void sendBulkEmail_sujetEtCorpsValides_retourne200() {
        Map<String, String> body = new HashMap<>();
        body.put("sujet", "Réunion");
        body.put("corps", "Bonjour à tous");

        ResponseEntity<?> response = adherentController.sendBulkEmail(body);

        assertEquals(200, response.getStatusCode().value());
        verify(adherentService).sendBulkEmail("Réunion", "Bonjour à tous");
    }

    @Test
    void sendBulkEmail_valide_délègueAuServiceAvecLesValeurs() {
        Map<String, String> body = new HashMap<>();
        body.put("sujet", "Mon sujet");
        body.put("corps", "Mon corps");

        adherentController.sendBulkEmail(body);

        verify(adherentService).sendBulkEmail("Mon sujet", "Mon corps");
    }

    @Test
    void sendBulkEmail_réponse400ContientMessageDErreur() {
        Map<String, String> body = new HashMap<>();
        body.put("corps", "Corps sans sujet");

        ResponseEntity<?> response = adherentController.sendBulkEmail(body);

        assertEquals(400, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().toString().toLowerCase().contains("requis")
                || response.getBody().toString().toLowerCase().contains("sujet"));
    }
}
