package com.api.estoque.backend.controller;

import java.net.URI;
import java.util.List;

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

import com.api.estoque.backend.dto.FornecedorDTO;
import com.api.estoque.backend.model.Endereco;
import com.api.estoque.backend.model.Fornecedor;
import com.api.estoque.backend.service.FornecedorService;

@RestController
@RequestMapping(value = "api/fornecedores")
public class FornecedorController {

    @Autowired
    private FornecedorService service;

    @GetMapping
    public ResponseEntity<Page<Fornecedor>> 
    findByNameContaining( @RequestParam(name = "name", required = false) String nome, 
                          @PageableDefault(sort = "idFornecedor", direction = Direction.ASC) Pageable pageable) {
        Page<Fornecedor> page = service.findByNameContaining(nome, pageable);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Fornecedor>> findAll() {
        List<Fornecedor> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Fornecedor> findByid(@PathVariable Long id) {
        Fornecedor fornecedor = service.findById(id);
        return ResponseEntity.ok().body(fornecedor);
    }

    @PostMapping
    public ResponseEntity<Fornecedor> insert(@RequestBody FornecedorDTO fornecedorDTO) {

        Fornecedor fornecedor = service.fromDto(fornecedorDTO);
        
        Endereco endereco = service.enderecoFornecedorExists(fornecedor);
        fornecedor.setEndereco(endereco);

        fornecedor = service.insert(fornecedor);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                                             .path("/{id}")
                                             .buildAndExpand(fornecedor.getIdFornecedor())
                                             .toUri(); 
        return ResponseEntity.created(uri).body(fornecedor);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Fornecedor> update(@PathVariable Long id, @RequestBody FornecedorDTO fornecedorDTO) {
        fornecedorDTO.setIdFornecedor(id);

        Fornecedor fornecedor = service.fromDto(fornecedorDTO);

        Endereco endereco = service.enderecoFornecedorExists(fornecedor);
        endereco.setIdEndereco(findByid(id).getBody().getEndereco().getIdEndereco());
        fornecedor.setEndereco(endereco);

        fornecedor = service.update(id, fornecedor);
        return ResponseEntity.ok().body(fornecedor);
    }
    
}
