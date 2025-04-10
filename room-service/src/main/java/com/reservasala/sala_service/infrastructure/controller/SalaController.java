package com.reservasala.sala_service.infrastructure.controller;

import com.reservasala.sala_service.domain.model.entidade.Sala;
import com.reservasala.sala_service.interfaces.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/salas")
public class SalaController {

    @Autowired
    private SalaService salaService;

    @GetMapping
    public List<Sala> listar() {
        return salaService.listarTodas();
    }

    @PostMapping
    public Sala criar(@RequestBody Sala sala) {
        return salaService.criarSala(sala);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        salaService.deletarSala(id);
    }
}