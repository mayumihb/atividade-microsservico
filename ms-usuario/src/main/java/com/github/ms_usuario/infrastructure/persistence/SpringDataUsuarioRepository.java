package com.github.ms_usuario.infrastructure.persistence;

import com.github.ms_usuario.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataUsuarioRepository extends JpaRepository<Usuario, Long> {
}