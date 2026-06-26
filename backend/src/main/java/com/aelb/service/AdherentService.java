package com.aelb.service;

import com.aelb.model.Adherent;
import com.aelb.repository.AdherentRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdherentService {

    private final AdherentRepository adherentRepository;
    private final EmailService emailService;

    public AdherentService(AdherentRepository adherentRepository, EmailService emailService) {
        this.adherentRepository = adherentRepository;
        this.emailService = emailService;
    }

    public List<Adherent> importFromExcel(MultipartFile file) throws IOException {
        List<Adherent> imported = new ArrayList<>();
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;

                String nom    = getCellString(row, 0);
                String prenom = getCellString(row, 1);
                String email  = getCellString(row, 2);
                if (nom.isBlank() || prenom.isBlank() || email.isBlank()) continue;

                Adherent a = adherentRepository.findByEmail(email).orElse(new Adherent());
                a.setNom(nom);
                a.setPrenom(prenom);
                a.setEmail(email);
                a.setTelephone(getCellString(row, 3));
                a.setSection(getCellString(row, 4));

                String dateStr = getCellString(row, 5);
                if (!dateStr.isBlank()) {
                    try { a.setDateNaissance(LocalDate.parse(dateStr)); } catch (Exception ignored) {}
                }

                String anneeStr = getCellString(row, 6);
                if (!anneeStr.isBlank()) {
                    try { a.setAnneeAdhesion(Integer.parseInt(anneeStr)); } catch (NumberFormatException ignored) {}
                }

                String cotisStr = getCellString(row, 7).toLowerCase();
                a.setCotisationPayee(cotisStr.equals("oui") || cotisStr.equals("true") || cotisStr.equals("1"));

                String anneeCtStr = getCellString(row, 8);
                if (!anneeCtStr.isBlank()) {
                    try { a.setAnneeCotisation(Integer.parseInt(anneeCtStr)); } catch (NumberFormatException ignored) {}
                }

                a.setActif(true);
                imported.add(adherentRepository.save(a));
            }
        }
        return imported;
    }

    public byte[] exportToExcel() throws IOException {
        List<Adherent> adherents = adherentRepository.findAll();
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Adhérents");

            String[] headers = {
                "Nom", "Prénom", "Email", "Téléphone", "Section",
                "Date de naissance", "Année d'adhésion", "Cotisation payée", "Année cotisation", "Actif"
            };

            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);

            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            for (int i = 0; i < adherents.size(); i++) {
                Adherent a = adherents.get(i);
                Row row = sheet.createRow(i + 1);
                row.createCell(0).setCellValue(a.getNom());
                row.createCell(1).setCellValue(a.getPrenom());
                row.createCell(2).setCellValue(a.getEmail());
                row.createCell(3).setCellValue(a.getTelephone() != null ? a.getTelephone() : "");
                row.createCell(4).setCellValue(a.getSection() != null ? a.getSection() : "");
                row.createCell(5).setCellValue(a.getDateNaissance() != null ? a.getDateNaissance().toString() : "");
                row.createCell(6).setCellValue(a.getAnneeAdhesion() != null ? a.getAnneeAdhesion() : 0);
                row.createCell(7).setCellValue(a.isCotisationPayee() ? "Oui" : "Non");
                row.createCell(8).setCellValue(a.getAnneeCotisation() != null ? a.getAnneeCotisation() : 0);
                row.createCell(9).setCellValue(a.isActif() ? "Oui" : "Non");
            }

            for (int i = 0; i < headers.length; i++) sheet.autoSizeColumn(i);

            workbook.write(out);
            return out.toByteArray();
        }
    }

    public void sendBulkEmail(String sujet, String corps) {
        List<String> emails = adherentRepository.findAllActiveEmails();
        for (String email : emails) {
            emailService.sendEmail(email, sujet, corps);
        }
    }

    private String getCellString(Row row, int col) {
        Cell cell = row.getCell(col);
        if (cell == null) return "";
        return switch (cell.getCellType()) {
            case STRING  -> cell.getStringCellValue().trim();
            case NUMERIC -> String.valueOf((long) cell.getNumericCellValue());
            case BOOLEAN -> cell.getBooleanCellValue() ? "true" : "false";
            default      -> "";
        };
    }
}
