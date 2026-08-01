package com.pitchproximity.backend.repository;

import com.pitchproximity.backend.entity.FootballEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FootballEventRepository extends JpaRepository<FootballEvent, Integer> {

    @Query(value = "SELECT * FROM football_events ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Optional<FootballEvent> findRandomEvent();
}
