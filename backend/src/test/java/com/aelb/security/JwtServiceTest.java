package com.aelb.security;

import io.jsonwebtoken.ExpiredJwtException;
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

    // Clé d'au moins 32 caractères requise pour HMAC-SHA256
    private static final String SECRET = "cle-secrete-de-test-minimum-32-caracteres!";
    private static final long EXPIRATION_1H = 3_600_000L;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "secret", SECRET);
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", EXPIRATION_1H);
    }

    // -------------------------------------------------------------------------
    // generateToken
    // -------------------------------------------------------------------------

    @Test
    void generateToken_retourneUnTokenNonVide() {
        String token = jwtService.generateToken(buildUser("admin@aelb.com"));
        assertNotNull(token);
        assertFalse(token.isBlank());
    }

    @Test
    void generateToken_inclutLesRolesDansLesClaims() {
        UserDetails user = new User("admin@aelb.com", "hash",
                List.of(new SimpleGrantedAuthority("ADMIN")));

        String token = jwtService.generateToken(user);

        Object rolesClaim = jwtService.extractClaim(token, claims -> claims.get("roles"));
        assertNotNull(rolesClaim);
        assertTrue(rolesClaim.toString().contains("ADMIN"));
    }

    // -------------------------------------------------------------------------
    // extractUsername
    // -------------------------------------------------------------------------

    @Test
    void extractUsername_retourneLUsernameCorrect() {
        UserDetails user = buildUser("admin@aelb.com");
        String token = jwtService.generateToken(user);

        assertEquals("admin@aelb.com", jwtService.extractUsername(token));
    }

    // -------------------------------------------------------------------------
    // isTokenValid
    // -------------------------------------------------------------------------

    @Test
    void isTokenValid_tokenValide_retourneTrue() {
        UserDetails user = buildUser("admin@aelb.com");
        String token = jwtService.generateToken(user);

        assertTrue(jwtService.isTokenValid(token, user));
    }

    @Test
    void isTokenValid_usernameNonCorrespondant_retourneFalse() {
        UserDetails owner = buildUser("admin@aelb.com");
        UserDetails autre = buildUser("autre@x.com");
        String token = jwtService.generateToken(owner);

        assertFalse(jwtService.isTokenValid(token, autre));
    }

    @Test
    void isTokenValid_tokenExpiré_leveExpiredJwtException() {
        // JJWT 0.12.x rejette les tokens expirés lors du parsing (ExpiredJwtException)
        // plutôt que de retourner false — c'est le comportement réel à valider
        JwtService expiredService = new JwtService();
        ReflectionTestUtils.setField(expiredService, "secret", SECRET);
        ReflectionTestUtils.setField(expiredService, "jwtExpiration", -1000L);

        UserDetails user = buildUser("admin@aelb.com");
        String expiredToken = expiredService.generateToken(user);

        assertThrows(ExpiredJwtException.class, () -> expiredService.isTokenValid(expiredToken, user));
    }

    // -------------------------------------------------------------------------
    // Helper
    // -------------------------------------------------------------------------

    private UserDetails buildUser(String username) {
        return new User(username, "hashed-password",
                List.of(new SimpleGrantedAuthority("ADMIN")));
    }
}
