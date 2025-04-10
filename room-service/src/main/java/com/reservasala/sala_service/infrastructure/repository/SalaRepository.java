package com.reservasala.sala_service.infrastructure.repository;

import com.reservasala.sala_service.domain.model.entidade.Sala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalaRepository extends JpaRepository<Sala, Long> {
}