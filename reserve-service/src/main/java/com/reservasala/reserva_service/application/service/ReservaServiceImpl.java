package com.reservasala.reserva_service.application.service;

import com.reservasala.reserva_service.domain.model.entidade.Reserva;
import com.reservasala.reserva_service.infrastructure.repository.ReservaRepository;
import com.reservasala.reserva_service.interfaces.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaServiceImpl implements ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Override
    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    @Override
    public Reserva criarReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    @Override
    public void deletarReserva(Long id) {
        reservaRepository.deleteById(id);
    }
}