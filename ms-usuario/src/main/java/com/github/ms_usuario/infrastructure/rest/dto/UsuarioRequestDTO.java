package com.github.ms_usuario.infrastructure.rest.dto;

import com.github.ms_usuario.domain.model.value.Endereco;

public record UsuarioRequestDTO(String nome,
                                String email,
                                Endereco endereco) {
}
