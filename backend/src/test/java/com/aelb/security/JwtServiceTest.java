package com.aelb.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;

    // Minimum 32 caractères requis pour HMAC-SHA256
    private static final String SECRET = "cle-secrete-de-test-minimum-32-caracteres!";

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "secret", SECRET);
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", 3_600_000L);
    }

    @Test
    void extractUsername_retourneLUsernameEncodéDansLeToken() {
        String token = jwtService.generateToken(buildUser("admin@aelb.com"));
        assertEquals("admin@aelb.com", jwtService.extractUsername(token));
    }

    @Test
    void isTokenValid_tokenValide_retourneTrue() {
        UserDetails user = buildUser("admin@aelb.com");
        assertTrue(jwtService.isTokenValid(jwtService.generateToken(user), user));
    }

    @Test
    void isTokenValid_tokenAppartenantÀUnAutreUtilisateur_retourneFalse() {
        // Empêche qu'un token d'un admin soit accepté pour un autre compte
        String tokenPourAdmin = jwtService.generateToken(buildUser("admin@aelb.com"));
        assertFalse(jwtService.isTokenValid(tokenPourAdmin, buildUser("autre@x.com")));
    }

    private UserDetails buildUser(String username) {
        return new User(username, "hashed-password", List.of(new SimpleGrantedAuthority("ADMIN")));
    }
}
