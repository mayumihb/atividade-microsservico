package com.reservasala.usuario_service.infrastructure.repository;

import com.reservasala.usuario_service.domain.model.entidade.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}