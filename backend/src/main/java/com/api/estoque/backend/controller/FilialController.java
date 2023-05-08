package com.api.estoque.backend.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.api.estoque.backend.dto.FilialDTO;
import com.api.estoque.backend.model.Endereco;
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
    public ResponseEntity<Page<Filial>> 
    findByNameContaining( @RequestParam(name = "name", required = false) String name, 
                          @PageableDefault(sort = "id", direction = Direction.ASC) Pageable pageable) {
        Page<Filial> list = service.findByNameContaining(name, pageable);
        return ResponseEntity.ok().body(list);
    }
    
    @GetMapping(value = "/{id}")
    public ResponseEntity<Filial> findByid(@PathVariable Long id) {
        Filial filial = service.findById(id);
        return ResponseEntity.ok().body(filial);
    }

    @PostMapping
    public ResponseEntity<Filial> insert(@RequestBody FilialDTO filialDTO) {
        Usuario instanceUsuario = usuarioService.findById(Long.parseLong(filialDTO.getUsuarioFK()));
        Filial newFilial = service.fromDto(filialDTO);
        Endereco endereco = service.enderecoFilialExists(newFilial);
        
        newFilial.setUsuario(instanceUsuario);
        newFilial.setEndereco(endereco);

        newFilial = service.insert(newFilial);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                                             .path("/{id}")
                                             .buildAndExpand(newFilial.getIdFilial())
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
        filialDTO.setIdFilial(id);
        Usuario usuarioFK = usuarioService.findById(Long.parseLong(filialDTO.getUsuarioFK()));
        Filial filialUpdate = service.fromDto(filialDTO);
        Endereco endereco = service.enderecoFilialExists(filialUpdate);

        endereco.setFilial(filialUpdate);
        endereco.setIdEndereco(findByid(id).getBody().getEndereco().getIdEndereco());
        
        filialUpdate.setEndereco(endereco);
        filialUpdate.setUsuario(usuarioFK);
        filialUpdate = service.update(id, filialUpdate);
        return ResponseEntity.ok().body(filialUpdate);
    }
    
}
