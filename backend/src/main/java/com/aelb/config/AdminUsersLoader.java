package com.aelb.config;

import com.aelb.model.RoleUtilisateur;
import com.aelb.model.Utilisateur;
import com.aelb.repository.UtilisateurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.Yaml;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class AdminUsersLoader implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminUsersLoader.class);

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminUsersLoader(UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        List<Map<String, String>> admins = loadAdminsFromFile();

        if (admins == null || admins.isEmpty()) {
            log.warn("[AdminUsersLoader] admins.yml vide ou introuvable — aucune modification effectuée.");
            return;
        }

        Set<String> fileEmails = admins.stream()
                .map(a -> a.get("email").toLowerCase())
                .collect(Collectors.toSet());

        for (Map<String, String> entry : admins) {
            String email = entry.get("email").toLowerCase();
            String rawPassword = entry.get("password");
            Utilisateur user = utilisateurRepository.findByUsername(email).orElse(new Utilisateur());
            user.setUsername(email);
            user.setPasswordHash(passwordEncoder.encode(rawPassword));
            user.setRole(RoleUtilisateur.ADMIN);
            utilisateurRepository.save(user);
            log.info("[AdminUsersLoader] Admin synchronisé : {}", email);
        }

        // Supprime les admins en base qui ne sont plus dans le fichier
        utilisateurRepository.findAll().stream()
                .filter(u -> u.getRole() == RoleUtilisateur.ADMIN)
                .filter(u -> !fileEmails.contains(u.getUsername().toLowerCase()))
                .forEach(u -> {
                    utilisateurRepository.delete(u);
                    log.info("[AdminUsersLoader] Admin révoqué (absent de admins.yml) : {}", u.getUsername());
                });
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, String>> loadAdminsFromFile() {
        try {
            ClassPathResource resource = new ClassPathResource("admins.yml");
            try (InputStream is = resource.getInputStream()) {
                Map<String, Object> data = new Yaml().load(is);
                return (List<Map<String, String>>) data.get("admins");
            }
        } catch (Exception e) {
            log.error("[AdminUsersLoader] Erreur lecture admins.yml : {}", e.getMessage());
            return null;
        }
    }
}
