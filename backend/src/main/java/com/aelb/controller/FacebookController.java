package com.aelb.controller;

import com.aelb.dto.FacebookPostDto;
import com.aelb.service.FacebookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/facebook")
public class FacebookController {

    private final FacebookService facebookService;

    public FacebookController(FacebookService facebookService) {
        this.facebookService = facebookService;
    }

    @GetMapping("/posts")
    public ResponseEntity<List<FacebookPostDto>> getLatestPosts(
            @RequestParam(defaultValue = "3") int limit) {
        return ResponseEntity.ok(facebookService.getLatestPosts(limit));
    }
}
