package com.github.ms_usuario.domain.model.value;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Embeddable
@Setter
public class Endereco {
    private String cidade;
    private String estado;
    private String rua;
    private String numero;

    protected Endereco() {
    }

    public Endereco(String cidade, String estado, String numero, String rua) {
        this.cidade = cidade;
        this.estado = estado;
        this.numero = numero;
        this.rua = rua;
    }
}
