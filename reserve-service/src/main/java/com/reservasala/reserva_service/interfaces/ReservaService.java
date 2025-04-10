package com.reservasala.reserva_service.interfaces;

import com.reservasala.reserva_service.domain.model.entidade.Reserva;

import java.util.List;

public interface ReservaService {
    List<Reserva> listarTodas();
    Reserva criarReserva(Reserva reserva);
    void deletarReserva(Long id);
}