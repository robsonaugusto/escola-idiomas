package com.escola.idiomas.service;

import com.escola.idiomas.domain.Professor;
import com.escola.idiomas.dto.ProfessorDTO;
import com.escola.idiomas.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessorService {

    private final ProfessorRepository professorRepository;

    public List<Professor> listarTodos() {
        return professorRepository.findAll();
    }

    public Professor criarProfessor(ProfessorDTO dto) {
        if (professorRepository.findByCpf(dto.getCpf()).isPresent()) {
            throw new IllegalArgumentException("CPF já cadastrado.");
        }
        Professor professor = new Professor();
        // Mapear DTO para Entidade
        professor.setCpf(dto.getCpf());
        professor.setNome(dto.getNome());
        professor.setDataNascimento(dto.getDataNascimento());
        professor.setEspecialidade(dto.getEspecialidade());
        professor.setStatus(dto.getStatus() != null ? dto.getStatus() : "Ativo");
        return professorRepository.save(professor);
    }

    // Adicione métodos para atualizar, deletar e buscar
}