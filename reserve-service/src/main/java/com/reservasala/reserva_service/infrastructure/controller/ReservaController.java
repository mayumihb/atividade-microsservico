package com.reservasala.reserva_service.infrastructure.controller;

import com.reservasala.reserva_service.domain.model.entidade.Reserva;
import com.reservasala.reserva_service.interfaces.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public List<Reserva> listar() {
        return reservaService.listarTodas();
    }

    @PostMapping
    public Reserva criar(@RequestBody Reserva reserva) {
        return reservaService.criarReserva(reserva);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        reservaService.deletarReserva(id);
    }
}