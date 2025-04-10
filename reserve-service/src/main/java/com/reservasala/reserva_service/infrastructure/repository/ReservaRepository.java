package com.reservasala.reserva_service.infrastructure.repository;

import com.reservasala.reserva_service.domain.model.entidade.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
}