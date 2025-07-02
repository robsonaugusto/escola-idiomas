package com.escola.idiomas.domain;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataHora;

    @ManyToOne
    private Professor professor;

    @ManyToOne
    private Estudante estudante;

    @Column(nullable = false)
    private String status = "Agendada"; // Ex: Agendada, Finalizada, Cancelada

    @Column(columnDefinition = "TEXT")
    private String observacoes;
}