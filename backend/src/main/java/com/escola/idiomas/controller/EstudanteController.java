package com.escola.idiomas.controller;

import com.escola.idiomas.domain.Estudante;
import com.escola.idiomas.dto.EstudanteDTO;
import com.escola.idiomas.service.EstudanteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/estudantes")
@RequiredArgsConstructor
public class EstudanteController {

    private final EstudanteService estudanteService;

    @PostMapping
    public ResponseEntity<Estudante> cadastrarEstudante(@Valid @RequestBody EstudanteDTO dto) {
        Estudante estudante = estudanteService.cadastrarEstudante(dto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(estudante.getId())
                .toUri();
        return ResponseEntity.created(location).body(estudante);
    }
}