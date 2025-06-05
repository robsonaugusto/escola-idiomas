package com.escola.idiomas.repository;

import com.escola.idiomas.domain.Estudante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EstudanteRepository extends JpaRepository<Estudante, Long> {

    Optional<Estudante> findByCpf(String cpf);

    Optional<Estudante> findByEmail(String email);

    boolean existsByCpf(String cpf);

    boolean existsByEmail(String email);

    @Query("SELECT e FROM Estudante e WHERE " +
            "LOWER(e.nome) LIKE LOWER(CONCAT('%', :termo, '%')) OR " +
            "LOWER(e.cpf) LIKE LOWER(CONCAT('%', :termo, '%')) OR " +
            "LOWER(e.email) LIKE LOWER(CONCAT('%', :termo, '%'))")
    List<Estudante> buscarPorTermo(@Param("termo") String termo);

    List<Estudante> findByEstadoIgnoreCase(String estado);

    List<Estudante> findByCidadeIgnoreCase(String cidade);
}