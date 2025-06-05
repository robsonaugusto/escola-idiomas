package com.escola.idiomas.repository;

import com.escola.idiomas.domain.Estudante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstudanteRepository extends JpaRepository<Estudante, Long> {
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);
}