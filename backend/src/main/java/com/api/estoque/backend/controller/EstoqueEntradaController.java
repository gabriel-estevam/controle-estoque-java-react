package com.api.estoque.backend.controller;

import java.net.URI;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

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

import com.api.estoque.backend.dto.EstoqueEntradaDTO;
import com.api.estoque.backend.model.EstoqueEntrada;
import com.api.estoque.backend.service.EstoqueEntradaService;

@RestController
@RequestMapping(value = "api/estoque/entrada")
public class EstoqueEntradaController {
    
    @Autowired
    private EstoqueEntradaService service;

    @GetMapping
    public ResponseEntity<Page<EstoqueEntrada>>
    findByitensEstoqueProdutoNomeContaining(
        @RequestParam(name = "nome", required = false) String nome, 
        @PageableDefault(sort = "itensEstoque_id_produto_idProduto", direction = Direction.ASC) Pageable pageable
    ){
        Page<EstoqueEntrada> page = service.findByitensEstoqueProdutoNomeContaining(nome, pageable);
        return ResponseEntity.ok().body(page);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<EstoqueEntradaDTO> findbyId(@PathVariable Long id) {
        EstoqueEntrada estoque = service.findById(id);
        return ResponseEntity.ok().body(new EstoqueEntradaDTO(estoque));
    }

    @GetMapping("/all")
    public ResponseEntity<List<EstoqueEntradaDTO>> findAll() {
        List<EstoqueEntrada> list = service.findAll();

        List<EstoqueEntradaDTO> listDto = list
            .stream()
            .map(x -> new EstoqueEntradaDTO(x))
            .collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody EstoqueEntradaDTO dto) {
        dto.setItensEstoque(dto.getItensEstoque());
        dto.setDataEntrada(Instant.now());
        EstoqueEntrada estoque = service.fromDto(dto);

        estoque = service.insert(estoque);
        
        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(estoque.getIdEstoque())
            .toUri(); 
        return ResponseEntity.created(uri).build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody EstoqueEntradaDTO dto) {
        dto.setIdEstoque(id);
        EstoqueEntrada estoqueEntrada = service.fromDto(dto);
        estoqueEntrada = service.update(dto.getIdEstoque(), estoqueEntrada);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
