package com.escola.idiomas.repository;

import com.escola.idiomas.domain.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Optional<Professor> findByCpf(String cpf);
    List<Professor> findByNomeContainingIgnoreCaseOrCpfContaining(String nome, String cpf);
}