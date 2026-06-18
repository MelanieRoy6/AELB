package com.aelb.service;

import com.aelb.dto.FacebookPostDto;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class FacebookService {

    private static final Logger log = LoggerFactory.getLogger(FacebookService.class);
    private static final long CACHE_TTL_SECONDS = 300;
    private static final String GRAPH_BASE = "https://graph.facebook.com";

    private final RestTemplate restTemplate;

    @Value("${facebook.page-id:aelbrains}")
    private String pageId;

    @Value("${facebook.access-token:}")
    private String accessToken;

    @Value("${facebook.api-version:v19.0}")
    private String apiVersion;

    private List<FacebookPostDto> cache = Collections.emptyList();
    private Instant cacheTime = Instant.EPOCH;

    public FacebookService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<FacebookPostDto> getLatestPosts(int limit) {
        if (accessToken == null || accessToken.isBlank()) {
            log.warn("facebook.access-token non configuré — retour liste vide");
            return Collections.emptyList();
        }

        if (!cache.isEmpty() && Instant.now().isBefore(cacheTime.plusSeconds(CACHE_TTL_SECONDS))) {
            return cache;
        }

        try {
            String url = UriComponentsBuilder
                    .fromHttpUrl(GRAPH_BASE)
                    .pathSegment(apiVersion, pageId, "posts")
                    .queryParam("fields", "message,full_picture,created_time,permalink_url")
                    .queryParam("limit", limit)
                    .queryParam("access_token", accessToken)
                    .toUriString();

            JsonNode root = restTemplate.getForObject(url, JsonNode.class);
            if (root == null || !root.has("data")) return staleOrEmpty();

            List<FacebookPostDto> posts = new ArrayList<>();
            for (JsonNode node : root.get("data")) {
                String message = node.path("message").asText("");
                if (message.isBlank()) continue; // ignorer les posts sans texte (partages purs)

                FacebookPostDto post = new FacebookPostDto(
                        node.path("id").asText(),
                        message,
                        node.path("full_picture").asText(""),
                        node.path("created_time").asText(""),
                        node.path("permalink_url").asText("")
                );
                posts.add(post);
            }

            cache = posts;
            cacheTime = Instant.now();
            return posts;

        } catch (Exception e) {
            log.error("Erreur lors de la récupération des posts Facebook : {}", e.getMessage());
            return staleOrEmpty();
        }
    }

    private List<FacebookPostDto> staleOrEmpty() {
        return cache.isEmpty() ? Collections.emptyList() : cache;
    }
}
