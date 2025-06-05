package com.escola.idiomas.service;

import com.escola.idiomas.domain.Estudante;
import com.escola.idiomas.dto.EstudanteDTO;
import com.escola.idiomas.repository.EstudanteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EstudanteService {

    private final EstudanteRepository repository;

    public Estudante cadastrarEstudante(EstudanteDTO dto) {
        Estudante estudante = Estudante.builder()
                .cpf(dto.getCpf())
                .nome(dto.getNome())
                .dataNascimento(dto.getDataNascimento())
                .cep(dto.getCep())
                .logradouro(dto.getLogradouro())
                .numeroCasa(dto.getNumeroCasa())
                .bairro(dto.getBairro())
                .estado(dto.getEstado())
                .cidade(dto.getCidade())
                .telefone(dto.getTelefone())
                .email(dto.getEmail())
                .build();

        return repository.save(estudante);
    }
}