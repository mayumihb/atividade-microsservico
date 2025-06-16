package com.github.ms_reserva.domain.model;

import com.github.ms_reserva.domain.model.value.dataReserva;
import com.github.ms_reserva.domain.model.value.SalaId;
import com.github.ms_reserva.domain.model.value.UsuarioId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private dataReserva dataReserva;

    private String descricao;
    
    private String duracao;

    private String status;

    @Embedded
    private SalaId salaId;

    @Embedded
    private UsuarioId usuarioId;

    public Reserva(com.github.ms_reserva.domain.model.value.dataReserva dataReserva, String descricao, String duracao,
            String status, SalaId salaId, UsuarioId usuarioId) {
        this.dataReserva = dataReserva;
        this.descricao = descricao;
        this.duracao = duracao;
        this.status = status;
        this.salaId = salaId;
        this.usuarioId = usuarioId;
    }
}
