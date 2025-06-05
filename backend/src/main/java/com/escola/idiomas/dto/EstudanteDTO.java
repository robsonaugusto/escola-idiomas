package com.escola.idiomas.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstudanteDTO {
    private String cpf;
    private String nome;
    private LocalDate dataNascimento;
    private String cep;
    private String logradouro;
    private String numeroCasa;
    private String bairro;
    private String estado;
    private String cidade;
    private String telefone;
    private String email;
}