package com.api.estoque.backend.controller;

import java.net.URI;
import java.util.List;

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

import com.api.estoque.backend.dto.FilialDTO;
import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.service.FilialService;
import com.api.estoque.backend.service.UserService;

@RestController
@RequestMapping(value = "api/filiais")
public class FilialController {

    @Autowired
    private FilialService service;

    @Autowired
    private UserService usuarioService;

    @GetMapping
    public ResponseEntity<List<Filial>> findAll() {
        List<Filial> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Filial> findByID(@PathVariable Long id) {
        Filial filial = service.findById(id);
        return ResponseEntity.ok().body(filial);
    }

    @PostMapping
    public ResponseEntity<Filial> insert(@RequestBody FilialDTO filialDTO) {
        Usuario instanceUsuario = usuarioService.findById(Long.parseLong(filialDTO.getUsuarioFK()));
        Filial newFilial = service.fromDto(filialDTO);
        newFilial.setUsuario(instanceUsuario);
        newFilial = service.insert(newFilial);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                                             .path("/{id}")
                                             .buildAndExpand(newFilial.getId())
                                             .toUri(); 
        return ResponseEntity.created(uri).body(newFilial);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Filial> update(@PathVariable Long id, @RequestBody FilialDTO filialDTO) {
        filialDTO.setId(id);
        Usuario usuarioFK = usuarioService.findById(Long.parseLong(filialDTO.getUsuarioFK()));
        Filial filialUpdate = service.fromDto(filialDTO);
        filialUpdate.setUsuario(usuarioFK);
        filialUpdate = service.update(id, filialUpdate);
        return ResponseEntity.ok().body(filialUpdate);
    }
    
}
