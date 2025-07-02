package com.escola.idiomas.controller;

import com.escola.idiomas.domain.Professor;
import com.escola.idiomas.dto.ProfessorDTO;
import com.escola.idiomas.service.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/professores")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200") // Para desenvolvimento
public class ProfessorController {

    private final ProfessorService professorService;

    @GetMapping
    public List<Professor> getAllProfessores() {
        return professorService.listarTodos();
    }

    @PostMapping
    public ResponseEntity<Professor> createProfessor(@Valid @RequestBody ProfessorDTO dto) {
        try {
            Professor novoProfessor = professorService.criarProfessor(dto);
            return ResponseEntity.ok(novoProfessor);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Adicione endpoints para PUT, DELETE, GET por ID, e busca
}
