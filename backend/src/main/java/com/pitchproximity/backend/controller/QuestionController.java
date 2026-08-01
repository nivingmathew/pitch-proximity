package com.pitchproximity.backend.controller;

import com.pitchproximity.backend.entity.FootballEvent;
import com.pitchproximity.backend.repository.FootballEventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/question")
@CrossOrigin(origins = "*")
public class QuestionController {

    private final FootballEventRepository repository;

    public QuestionController(FootballEventRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/random")
    public ResponseEntity<FootballEvent> getRandomQuestion() {
        return repository.findRandomEvent()
                .map(event -> ResponseEntity.ok().body(event))
                .orElse(ResponseEntity.notFound().build());
    }

}
