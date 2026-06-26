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

    @Mock
    private AdherentRepository adherentRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private AdherentService adherentService;

    // -------------------------------------------------------------------------
    // importFromExcel — navigation des lignes
    // -------------------------------------------------------------------------

    @Test
    void importExcel_ligneDEnTête_ignorée() throws IOException {
        // Le service boucle à partir de l'index 1 : la ligne 0 est toujours sautée
        byte[] excel = buildExcel(new String[][]{
                {"Dupont", "Jean", "jean@x.com"}
        });
        when(adherentRepository.findByEmail("jean@x.com")).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        List<Adherent> result = adherentService.importFromExcel(toMockFile(excel));

        assertEquals(1, result.size());
    }

    @Test
    void importExcel_ligneNomBlank_ignorée() throws IOException {
        byte[] excel = buildExcel(new String[][]{
                {"", "Jean", "jean@x.com"}
        });

        List<Adherent> result = adherentService.importFromExcel(toMockFile(excel));

        assertTrue(result.isEmpty());
        verify(adherentRepository, never()).save(any());
    }

    @Test
    void importExcel_lignePrenomBlank_ignorée() throws IOException {
        byte[] excel = buildExcel(new String[][]{
                {"Dupont", "", "jean@x.com"}
        });

        List<Adherent> result = adherentService.importFromExcel(toMockFile(excel));

        assertTrue(result.isEmpty());
    }

    @Test
    void importExcel_ligneEmailBlank_ignorée() throws IOException {
        byte[] excel = buildExcel(new String[][]{
                {"Dupont", "Jean", ""}
        });

        List<Adherent> result = adherentService.importFromExcel(toMockFile(excel));

        assertTrue(result.isEmpty());
    }

    // -------------------------------------------------------------------------
    // importFromExcel — upsert par email
    // -------------------------------------------------------------------------

    @Test
    void importExcel_emailExistant_miseAJourDeLAdherent() throws IOException {
        Adherent existing = new Adherent();
        existing.setNom("AncienNom");
        existing.setEmail("jean@x.com");

        byte[] excel = buildExcel(new String[][]{
                {"NouveauNom", "Jean", "jean@x.com"}
        });
        when(adherentRepository.findByEmail("jean@x.com")).thenReturn(Optional.of(existing));
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        List<Adherent> result = adherentService.importFromExcel(toMockFile(excel));

        assertEquals(1, result.size());
        assertEquals("NouveauNom", result.get(0).getNom());
        verify(adherentRepository, times(1)).save(existing);
    }

    @Test
    void importExcel_emailInexistant_créationNouvelAdherent() throws IOException {
        byte[] excel = buildExcel(new String[][]{
                {"Dupont", "Jean", "nouveau@x.com"}
        });
        when(adherentRepository.findByEmail("nouveau@x.com")).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        List<Adherent> result = adherentService.importFromExcel(toMockFile(excel));

        assertEquals(1, result.size());
        assertEquals("Dupont", result.get(0).getNom());
    }

    // -------------------------------------------------------------------------
    // importFromExcel — cotisationPayee
    // -------------------------------------------------------------------------

    @Test
    void importExcel_cotisationOui_vrai() throws IOException {
        byte[] excel = buildExcelAvecCotisation("oui");
        when(adherentRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        assertTrue(adherentService.importFromExcel(toMockFile(excel)).get(0).isCotisationPayee());
    }

    @Test
    void importExcel_cotisationOuiMajuscules_vrai() throws IOException {
        byte[] excel = buildExcelAvecCotisation("OUI");
        when(adherentRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        assertTrue(adherentService.importFromExcel(toMockFile(excel)).get(0).isCotisationPayee());
    }

    @Test
    void importExcel_cotisationTrue_vrai() throws IOException {
        byte[] excel = buildExcelAvecCotisation("true");
        when(adherentRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        assertTrue(adherentService.importFromExcel(toMockFile(excel)).get(0).isCotisationPayee());
    }

    @Test
    void importExcel_cotisation1_vrai() throws IOException {
        byte[] excel = buildExcelAvecCotisation("1");
        when(adherentRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        assertTrue(adherentService.importFromExcel(toMockFile(excel)).get(0).isCotisationPayee());
    }

    @Test
    void importExcel_cotisationNon_faux() throws IOException {
        byte[] excel = buildExcelAvecCotisation("non");
        when(adherentRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        assertFalse(adherentService.importFromExcel(toMockFile(excel)).get(0).isCotisationPayee());
    }

    @Test
    void importExcel_cotisationVide_faux() throws IOException {
        byte[] excel = buildExcelAvecCotisation("");
        when(adherentRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        assertFalse(adherentService.importFromExcel(toMockFile(excel)).get(0).isCotisationPayee());
    }

    // -------------------------------------------------------------------------
    // importFromExcel — champs optionnels avec parsing silencieux
    // -------------------------------------------------------------------------

    @Test
    void importExcel_dateNaissanceInvalide_ignoréeSilencieusement() throws IOException {
        byte[] excel = buildExcel(new String[][]{
                // nom, prénom, email, tel, section, dateNaissance
                {"Dupont", "Jean", "jean@x.com", "", "", "pas-une-date"}
        });
        when(adherentRepository.findByEmail("jean@x.com")).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        List<Adherent> result = adherentService.importFromExcel(toMockFile(excel));

        assertEquals(1, result.size());
        assertNull(result.get(0).getDateNaissance());
    }

    @Test
    void importExcel_annéeAdhésionNonNumérique_ignoréeSilencieusement() throws IOException {
        byte[] excel = buildExcel(new String[][]{
                // nom, prénom, email, tel, section, dateNaissance, anneeAdhesion
                {"Dupont", "Jean", "jean@x.com", "", "", "", "abc"}
        });
        when(adherentRepository.findByEmail("jean@x.com")).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        List<Adherent> result = adherentService.importFromExcel(toMockFile(excel));

        assertEquals(1, result.size());
        assertNull(result.get(0).getAnneeAdhesion());
    }

    @Test
    void importExcel_annéeCotisationNonNumérique_ignoréeSilencieusement() throws IOException {
        byte[] excel = buildExcel(new String[][]{
                // nom, prénom, email, tel, section, dateNaissance, anneeAdhesion, cotisation, anneeCotisation
                {"Dupont", "Jean", "jean@x.com", "", "", "", "", "oui", "xyz"}
        });
        when(adherentRepository.findByEmail("jean@x.com")).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        List<Adherent> result = adherentService.importFromExcel(toMockFile(excel));

        assertEquals(1, result.size());
        assertNull(result.get(0).getAnneeCotisation());
    }

    @Test
    void importExcel_tousLesImportésSontActifs() throws IOException {
        byte[] excel = buildExcel(new String[][]{
                {"Dupont", "Jean", "jean@x.com"},
                {"Martin", "Marie", "marie@x.com"}
        });
        when(adherentRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(adherentRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        List<Adherent> result = adherentService.importFromExcel(toMockFile(excel));

        assertEquals(2, result.size());
        assertTrue(result.stream().allMatch(Adherent::isActif));
    }

    // -------------------------------------------------------------------------
    // exportToExcel
    // -------------------------------------------------------------------------

    @Test
    void exportToExcel_retourneFluxNonVide() throws IOException {
        when(adherentRepository.findAll()).thenReturn(List.of());

        byte[] result = adherentService.exportToExcel();

        assertNotNull(result);
        assertTrue(result.length > 0);
    }

    @Test
    void exportToExcel_premièreLigneContientLesEnTêtes() throws IOException {
        when(adherentRepository.findAll()).thenReturn(List.of());

        byte[] result = adherentService.exportToExcel();

        try (Workbook wb = new XSSFWorkbook(new ByteArrayInputStream(result))) {
            Row header = wb.getSheetAt(0).getRow(0);
            assertEquals("Nom", header.getCell(0).getStringCellValue());
            assertEquals("Prénom", header.getCell(1).getStringCellValue());
            assertEquals("Email", header.getCell(2).getStringCellValue());
            assertEquals("Cotisation payée", header.getCell(7).getStringCellValue());
            assertEquals("Actif", header.getCell(9).getStringCellValue());
        }
    }

    @Test
    void exportToExcel_cotisationPayéeFormatéeOuiNon() throws IOException {
        Adherent a = new Adherent();
        a.setNom("Dupont");
        a.setPrenom("Jean");
        a.setEmail("jean@x.com");
        a.setCotisationPayee(true);
        a.setActif(false);
        when(adherentRepository.findAll()).thenReturn(List.of(a));

        byte[] result = adherentService.exportToExcel();

        try (Workbook wb = new XSSFWorkbook(new ByteArrayInputStream(result))) {
            Row dataRow = wb.getSheetAt(0).getRow(1);
            assertEquals("Oui", dataRow.getCell(7).getStringCellValue());
            assertEquals("Non", dataRow.getCell(9).getStringCellValue());
        }
    }

    @Test
    void exportToExcel_contientLesDonnéesDeLAdherent() throws IOException {
        Adherent a = new Adherent();
        a.setNom("Dupont");
        a.setPrenom("Jean");
        a.setEmail("jean@x.com");
        a.setTelephone("0600000000");
        a.setSection("Football");
        when(adherentRepository.findAll()).thenReturn(List.of(a));

        byte[] result = adherentService.exportToExcel();

        try (Workbook wb = new XSSFWorkbook(new ByteArrayInputStream(result))) {
            Row dataRow = wb.getSheetAt(0).getRow(1);
            assertEquals("Dupont", dataRow.getCell(0).getStringCellValue());
            assertEquals("Jean", dataRow.getCell(1).getStringCellValue());
            assertEquals("jean@x.com", dataRow.getCell(2).getStringCellValue());
            assertEquals("0600000000", dataRow.getCell(3).getStringCellValue());
            assertEquals("Football", dataRow.getCell(4).getStringCellValue());
        }
    }

    // -------------------------------------------------------------------------
    // sendBulkEmail
    // -------------------------------------------------------------------------

    @Test
    void sendBulkEmail_envoyéUniquementAuxAdherentsActifs() {
        when(adherentRepository.findAllActiveEmails())
                .thenReturn(List.of("actif1@x.com", "actif2@x.com"));

        adherentService.sendBulkEmail("Réunion annuelle", "Bonjour à tous");

        verify(emailService).sendEmail("actif1@x.com", "Réunion annuelle", "Bonjour à tous");
        verify(emailService).sendEmail("actif2@x.com", "Réunion annuelle", "Bonjour à tous");
        verifyNoMoreInteractions(emailService);
    }

    @Test
    void sendBulkEmail_aucunActif_aucunEmailEnvoyé() {
        when(adherentRepository.findAllActiveEmails()).thenReturn(List.of());

        adherentService.sendBulkEmail("Sujet", "Corps");

        verifyNoInteractions(emailService);
    }

    @Test
    void sendBulkEmail_sujetEtCorpsTransmisIntacts() {
        when(adherentRepository.findAllActiveEmails()).thenReturn(List.of("actif@x.com"));

        adherentService.sendBulkEmail("Mon sujet", "Mon corps");

        verify(emailService).sendEmail("actif@x.com", "Mon sujet", "Mon corps");
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    /**
     * Crée un fichier Excel avec une ligne d'en-tête à l'index 0 (ignorée par le service)
     * et les dataRows à partir de l'index 1.
     * Colonnes : nom(0), prenom(1), email(2), telephone(3), section(4),
     *            dateNaissance(5), anneeAdhesion(6), cotisation(7), anneeCotisation(8)
     */
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

    private byte[] buildExcelAvecCotisation(String valeurCotisation) throws IOException {
        return buildExcel(new String[][]{
                // nom, prenom, email, tel, section, dateNaissance, anneeAdhesion, cotisation
                {"Dupont", "Jean", "jean@x.com", "", "", "", "", valeurCotisation}
        });
    }

    private MockMultipartFile toMockFile(byte[] data) throws IOException {
        return new MockMultipartFile(
                "file", "adherents.xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                new ByteArrayInputStream(data)
        );
    }
}
