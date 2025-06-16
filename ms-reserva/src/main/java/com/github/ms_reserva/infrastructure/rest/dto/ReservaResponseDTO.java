package com.github.ms_reserva.infrastructure.rest.dto;

public record ReservaResponseDTO(Long id,
                                 String dataReserva,
                                 String descricao,
                                 String duracao,
                                 String status,
                                 Long salaId,
                                 Long usuarioId) {
}
