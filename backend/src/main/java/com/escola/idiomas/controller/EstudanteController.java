package com.escola.idiomas.controller;

import com.escola.idiomas.domain.Estudante;
import com.escola.idiomas.dto.EstudanteDTO;
import com.escola.idiomas.service.EstudanteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/estudantes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class EstudanteController {

    private final EstudanteService estudanteService;

    @PostMapping
    public ResponseEntity<?> cadastrarEstudante(@Valid @RequestBody EstudanteDTO dto) {
        try {
            Estudante estudante = estudanteService.cadastrarEstudante(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(estudante);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Estudante>> listarTodos() {
        List<Estudante> estudantes = estudanteService.listarTodos();
        return ResponseEntity.ok(estudantes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<Estudante> estudante = estudanteService.buscarPorId(id);
        if (estudante.isPresent()) {
            return ResponseEntity.ok(estudante.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<?> buscarPorCpf(@PathVariable String cpf) {
        Optional<Estudante> estudante = estudanteService.buscarPorCpf(cpf);
        if (estudante.isPresent()) {
            return ResponseEntity.ok(estudante.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Estudante>> buscarPorTermo(@RequestParam String termo) {
        List<Estudante> estudantes = estudanteService.buscarPorTermo(termo);
        return ResponseEntity.ok(estudantes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarEstudante(@PathVariable Long id, @Valid @RequestBody EstudanteDTO dto) {
        try {
            Estudante estudanteAtualizado = estudanteService.atualizarEstudante(id, dto);
            return ResponseEntity.ok(estudanteAtualizado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarEstudante(@PathVariable Long id) {
        try {
            estudanteService.deletarEstudante(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/existe/cpf/{cpf}")
    public ResponseEntity<Boolean> existePorCpf(@PathVariable String cpf) {
        boolean existe = estudanteService.existePorCpf(cpf);
        return ResponseEntity.ok(existe);
    }

    @GetMapping("/existe/email/{email}")
    public ResponseEntity<Boolean> existePorEmail(@PathVariable String email) {
        boolean existe = estudanteService.existePorEmail(email);
        return ResponseEntity.ok(existe);
    }
}