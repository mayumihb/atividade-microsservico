package com.github.ms_reserva.infrastructure.rest.dto;

public record ReservaRequestDTO(String dataReserva,
                                String descricao,
                                String duracao,
                                String status,
                                Long salaId,
                                Long usuarioId) {
}
