package com.escola.idiomas.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ProfessorDTO {
    private Long id;

    @NotBlank(message = "CPF é obrigatório")
    private String cpf;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    private LocalDate dataNascimento;
    private String especialidade;
    private String status;
}