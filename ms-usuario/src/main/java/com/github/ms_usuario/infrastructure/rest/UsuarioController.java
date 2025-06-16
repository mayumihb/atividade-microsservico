package com.github.ms_usuario.infrastructure.rest;

import com.github.ms_usuario.application.UsuarioService;
import com.github.ms_usuario.domain.model.Usuario;
import com.github.ms_usuario.domain.model.value.*;
import com.github.ms_usuario.infrastructure.rest.dto.UsuarioRequestDTO;
import com.github.ms_usuario.infrastructure.rest.dto.UsuarioResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody UsuarioRequestDTO userDTO) {
        Usuario usuario = new Usuario(
                new Nome(userDTO.nome()),
                new Email(userDTO.email()),
                new Endereco(userDTO.endereco().getCidade(), userDTO.endereco().getEstado(), userDTO.endereco().getNumero(), userDTO.endereco().getRua())
        );
        return ResponseEntity.ok(usuarioService.criarUsuario(usuario));
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.buscarTodos();

        List<UsuarioResponseDTO> responseDTOs = usuarios.stream()
                .map(usuario -> new UsuarioResponseDTO(
                        usuario.getId(),
                        usuario.getNome().getNome(),
                        usuario.getEmail().getEmail(),
                        usuario.getEndereco()
                ))
                .toList();

        return ResponseEntity.ok(responseDTOs);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(id);
        if (usuario.isPresent()) {
            usuarioService.excluirUsuario(usuario.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}