package com.api.estoque.backend.controller;

import java.net.URI;
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

import com.api.estoque.backend.dto.ProdutoDTO;
import com.api.estoque.backend.model.Produto;
import com.api.estoque.backend.repository.UnidadeMedidaRepository;
import com.api.estoque.backend.service.ProdutoService;

@RestController
@RequestMapping(value = "api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    @Autowired
    private UnidadeMedidaRepository UnidadeMedidaRep;

    @GetMapping
    public ResponseEntity<Page<Produto>> 
    findByNomeContaining( @RequestParam(name = "nome", required = false) String nome, 
                          @PageableDefault(sort = "idProduto", direction = Direction.ASC) Pageable pageable) {
        Page<Produto> page = service.findByNameContaining(nome, pageable);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<ProdutoDTO>> findAll() {
        List<Produto> list = service.findAll();
        List<ProdutoDTO> listDto = list.stream().map(x -> new ProdutoDTO(x)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }
    @GetMapping(value = "/{id}")
    public ResponseEntity<ProdutoDTO> findByid(@PathVariable Long id) {
        Produto produto = service.findById(id);
        return ResponseEntity.ok().body(new ProdutoDTO(produto));
    }

    @PostMapping
    public ResponseEntity<Produto> insert(@RequestBody ProdutoDTO produtoDTO) {
        produtoDTO.setUnidadeMedida(UnidadeMedidaRep.findById(produtoDTO.getUnidadeMedidaFK()).get());
        
        Produto produto = service.fromDto(produtoDTO);
        produto = service.insert(produto);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                                             .path("/{id}")
                                             .buildAndExpand(produto.getIdProduto())
                                             .toUri(); 
        return ResponseEntity.created(uri).body(produto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Produto> update(@PathVariable Long id, @RequestBody ProdutoDTO produtoDTO) {

        produtoDTO.setIdProduto(id);
        produtoDTO.setUnidadeMedida(UnidadeMedidaRep.findById(produtoDTO.getUnidadeMedidaFK()).get());
        
        Produto produto = service.fromDto(produtoDTO);

        produto = service.update(id, produto);
        return ResponseEntity.ok().body(produto);
    }
    
}
