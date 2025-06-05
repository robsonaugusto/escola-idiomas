package com.escola.idiomas.service;

import com.escola.idiomas.domain.Estudante;
import com.escola.idiomas.dto.EstudanteDTO;
import com.escola.idiomas.repository.EstudanteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class EstudanteService {

    private final EstudanteRepository repository;

    public Estudante cadastrarEstudante(EstudanteDTO dto) {
        // Verifica se CPF já existe
        if (repository.existsByCpf(dto.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado: " + dto.getCpf());
        }

        // Verifica se email já existe (se fornecido)
        if (dto.getEmail() != null && !dto.getEmail().isEmpty() &&
                repository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado: " + dto.getEmail());
        }

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

    @Transactional(readOnly = true)
    public List<Estudante> listarTodos() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Estudante> buscarPorId(Long id) {
        return repository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Estudante> buscarPorCpf(String cpf) {
        return repository.findByCpf(cpf);
    }

    @Transactional(readOnly = true)
    public List<Estudante> buscarPorTermo(String termo) {
        return repository.buscarPorTermo(termo);
    }

    public Estudante atualizarEstudante(Long id, EstudanteDTO dto) {
        Estudante estudante = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Estudante não encontrado com ID: " + id));

        // Verifica se o CPF foi alterado e se já existe
        if (!estudante.getCpf().equals(dto.getCpf()) && repository.existsByCpf(dto.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado: " + dto.getCpf());
        }

        // Verifica se o email foi alterado e se já existe
        if (dto.getEmail() != null && !dto.getEmail().isEmpty() &&
                !dto.getEmail().equals(estudante.getEmail()) &&
                repository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado: " + dto.getEmail());
        }

        // Atualiza os campos
        estudante.setCpf(dto.getCpf());
        estudante.setNome(dto.getNome());
        estudante.setDataNascimento(dto.getDataNascimento());
        estudante.setCep(dto.getCep());
        estudante.setLogradouro(dto.getLogradouro());
        estudante.setNumeroCasa(dto.getNumeroCasa());
        estudante.setBairro(dto.getBairro());
        estudante.setEstado(dto.getEstado());
        estudante.setCidade(dto.getCidade());
        estudante.setTelefone(dto.getTelefone());
        estudante.setEmail(dto.getEmail());

        return repository.save(estudante);
    }

    public void deletarEstudante(Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Estudante não encontrado com ID: " + id);
        }
        repository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public boolean existePorCpf(String cpf) {
        return repository.existsByCpf(cpf);
    }

    @Transactional(readOnly = true)
    public boolean existePorEmail(String email) {
        return repository.existsByEmail(email);
    }
}