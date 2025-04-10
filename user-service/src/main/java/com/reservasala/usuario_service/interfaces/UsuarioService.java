package com.reservasala.usuario_service.interfaces;

import com.reservasala.usuario_service.domain.model.entidade.Usuario;

import java.util.List;

public interface UsuarioService {
    List<Usuario> listarTodos();
    Usuario criarUsuario(Usuario usuario);
    void deletarUsuario(Long id);
}