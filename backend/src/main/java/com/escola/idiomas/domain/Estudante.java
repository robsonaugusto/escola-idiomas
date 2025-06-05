package com.escola.idiomas.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Estudante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false)
    private String nome;

    private LocalDate dataNascimento;

    private String cep;
    private String logradouro;
    private String numeroCasa;
    private String bairro;
    private String estado;
    private String cidade;
    private String telefone;

    @Column(nullable = false, unique = true)
    private String email;
}