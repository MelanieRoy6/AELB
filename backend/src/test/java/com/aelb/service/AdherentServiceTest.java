package com.aelb.service;

import com.aelb.model.Adherent;
import com.aelb.repository.AdherentRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdherentServiceTest {

    @Mock private AdherentRepository adherentRepository;
    @Mock private EmailService emailService;
    @InjectMocks private AdherentService adherentService;

    @Test
    void importExcel_ligneDEnTête_ignorée() throws IOException {
        // Le service boucle à partir de l'index 1 — la ligne 0 doit toujours être sautée
        byte[] excel = buildExcel(new String[][]{{"Dupont", "Jean", "jean@x.com"}});
        when(adherentRepository.findByEmail("jean@x.com")).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        assertEquals(1, adherentService.importFromExcel(toMockFile(excel)).size());
    }

    @Test
    void importExcel_champObligatoireBlank_ligneIgnorée() throws IOException {
        // email est la clé d'upsert : une ligne sans email ne doit pas être persistée
        byte[] excel = buildExcel(new String[][]{{"Dupont", "Jean", ""}});

        List<Adherent> result = adherentService.importFromExcel(toMockFile(excel));

        assertTrue(result.isEmpty());
        verify(adherentRepository, never()).save(any());
    }

    @Test
    void importExcel_emailExistant_adhérentMisAJourPasRecréé() throws IOException {
        // Upsert : même email → mise à jour de l'instance existante, pas de doublon
        Adherent existing = new Adherent();
        existing.setNom("AncienNom");
        existing.setEmail("jean@x.com");
        byte[] excel = buildExcel(new String[][]{{"NouveauNom", "Jean", "jean@x.com"}});
        when(adherentRepository.findByEmail("jean@x.com")).thenReturn(Optional.of(existing));
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        List<Adherent> result = adherentService.importFromExcel(toMockFile(excel));

        assertEquals("NouveauNom", result.get(0).getNom());
        verify(adherentRepository).save(existing); // même instance, pas un new Adherent()
    }

    @Test
    void importExcel_cotisationOui_mappéVrai() throws IOException {
        byte[] excel = buildExcelAvecCotisation("oui");
        when(adherentRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        assertTrue(adherentService.importFromExcel(toMockFile(excel)).get(0).isCotisationPayee());
    }

    @Test
    void importExcel_cotisationAutreValeur_mappéFaux() throws IOException {
        byte[] excel = buildExcelAvecCotisation("non");
        when(adherentRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        assertFalse(adherentService.importFromExcel(toMockFile(excel)).get(0).isCotisationPayee());
    }

    @Test
    void importExcel_tousLesImportésForcésActifs() throws IOException {
        // actif=true est appliqué silencieusement quel que soit le contenu du fichier
        byte[] excel = buildExcel(new String[][]{
                {"Dupont", "Jean", "jean@x.com"},
                {"Martin", "Marie", "marie@x.com"}
        });
        when(adherentRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        assertTrue(adherentService.importFromExcel(toMockFile(excel)).stream().allMatch(Adherent::isActif));
    }

    @Test
    void sendBulkEmail_envoyéUniquementAuxAdherentsActifs() {
        // Les adhérents inactifs ne doivent jamais recevoir d'email de groupe
        when(adherentRepository.findAllActiveEmails()).thenReturn(List.of("actif1@x.com", "actif2@x.com"));

        adherentService.sendBulkEmail("Réunion", "Bonjour");

        verify(emailService).sendEmail("actif1@x.com", "Réunion", "Bonjour");
        verify(emailService).sendEmail("actif2@x.com", "Réunion", "Bonjour");
        verifyNoMoreInteractions(emailService);
    }

    // -------------------------------------------------------------------------
    // Helpers
    // Colonnes : nom(0) prenom(1) email(2) tel(3) section(4)
    //            dateNaissance(5) anneeAdhesion(6) cotisation(7) anneeCotisation(8)
    // La ligne 0 est toujours l'en-tête (ignorée par le service).
    // -------------------------------------------------------------------------

    private byte[] buildExcel(String[][] dataRows) throws IOException {
        try (Workbook wb = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = wb.createSheet();
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Nom");
            header.createCell(1).setCellValue("Prénom");
            header.createCell(2).setCellValue("Email");
            for (int i = 0; i < dataRows.length; i++) {
                Row row = sheet.createRow(i + 1);
                for (int j = 0; j < dataRows[i].length; j++) {
                    row.createCell(j).setCellValue(dataRows[i][j]);
                }
            }
            wb.write(out);
            return out.toByteArray();
        }
    }

    private byte[] buildExcelAvecCotisation(String valeur) throws IOException {
        return buildExcel(new String[][]{{"Dupont", "Jean", "jean@x.com", "", "", "", "", valeur}});
    }

    private MockMultipartFile toMockFile(byte[] data) throws IOException {
        return new MockMultipartFile("file", "adherents.xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                new ByteArrayInputStream(data));
    }
}
