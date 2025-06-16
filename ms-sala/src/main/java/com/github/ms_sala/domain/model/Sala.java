package com.github.ms_sala.domain.model;

import com.github.ms_sala.domain.model.value.Capacidade;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sala {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    
    @Embedded
    private Capacidade capacidade;

    public Sala(String descricao, Capacidade capacidade) {
        this.descricao = descricao;
        this.capacidade = capacidade;
    }
}