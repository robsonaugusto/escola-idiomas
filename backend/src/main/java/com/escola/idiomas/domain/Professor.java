package com.escola.idiomas.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true, nullable = false)
    private String cpf;

    @NotBlank
    @Column(nullable = false)
    private String nome;

    private LocalDate dataNascimento;

    private String especialidade;

    @Column(nullable = false)
    private String status = "Ativo"; // "Ativo" ou "Inativo"
}