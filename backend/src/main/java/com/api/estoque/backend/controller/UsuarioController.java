package com.api.estoque.backend.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.api.estoque.backend.dto.UsuarioDTO;
import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.service.UsuarioService;

@RestController
@RequestMapping(value = "/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> findAll() {
        List<Usuario> list = service.findAll();
        List<UsuarioDTO> listDto = list.stream().map(parseDto -> new UsuarioDTO(parseDto)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UsuarioDTO> findById(@PathVariable Long id) {
        Usuario usuario = service.findById(id);
        return ResponseEntity.ok().body(new UsuarioDTO(usuario));
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> insert(@RequestBody UsuarioDTO usuarioDto) {
        Usuario usuario = service.fromDto(usuarioDto);
        usuario = service.insert(usuario);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(usuario.getId())
                .toUri(); // ele insere um novo usuario e na sequencia reterna no header da resposta o
                          // caminho para
                          // recuperar (select by id) dado inserido
        return ResponseEntity.created(uri).body(new UsuarioDTO(usuario)); // ao inserir um dado no banco de dados,
                                                                          // devemos usar o status
        // 201 created
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<UsuarioDTO> update(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDto) {
        Usuario usuario = service.fromDto(usuarioDto);
        usuario = service.update(id, usuario);
        return ResponseEntity.ok().body(new UsuarioDTO(usuario));
    }
}
