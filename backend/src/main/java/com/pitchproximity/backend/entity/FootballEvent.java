package com.pitchproximity.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "football_events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FootballEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "event_description", nullable = false)
    private String eventDescription;

    @Column(name = "event_year", nullable = false)
    private Integer eventYear;
}
