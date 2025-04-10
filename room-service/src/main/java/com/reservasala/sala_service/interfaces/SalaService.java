package com.reservasala.sala_service.interfaces;

import com.reservasala.sala_service.domain.model.entidade.Sala;

import java.util.List;

public interface SalaService {
    List<Sala> listarTodas();
    Sala criarSala(Sala sala);
    void deletarSala(Long id);
}