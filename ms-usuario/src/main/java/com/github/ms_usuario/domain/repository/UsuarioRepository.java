package com.github.ms_usuario.domain.repository;

import com.github.ms_usuario.domain.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository {
    Usuario save(Usuario usuario);
    List<Usuario> findAll();
    boolean existsById(Long id);
    Optional<Usuario> findById(Long id);
    void delete(Usuario usuario);
}