package com.reservasala.usuario_service.domain.model.valor;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor(force = true) // JPA requires a no-args constructor
public class Endereco {
    private final String rua;
    private final String numero;
    private final String cidade;
}