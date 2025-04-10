package com.reservasala.sala_service.application.service;

import com.reservasala.sala_service.domain.model.entidade.Sala;
import com.reservasala.sala_service.infrastructure.repository.SalaRepository;
import com.reservasala.sala_service.interfaces.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaServiceImpl implements SalaService {

    @Autowired
    private SalaRepository salaRepository;

    @Override
    public List<Sala> listarTodas() {
        return salaRepository.findAll();
    }

    @Override
    public Sala criarSala(Sala sala) {
        return salaRepository.save(sala);
    }

    @Override
    public void deletarSala(Long id) {
        salaRepository.deleteById(id);
    }
}