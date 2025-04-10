package com.reservasala.reserva_service.domain.model.entidade;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long salaId;
    private Long usuarioId;
    private String descricao;
    private String dataReserva;
    private String duracao;
    private String status;
}