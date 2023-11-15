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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.api.estoque.backend.dto.EstoqueEntradaDTO;
import com.api.estoque.backend.dto.ItemEstoqueEntradaDTO;
import com.api.estoque.backend.dto.UserDTO;
import com.api.estoque.backend.model.EstoqueEntrada;
import com.api.estoque.backend.service.EstoqueEntradaService;
import com.api.estoque.backend.service.FornecedorService;
import com.api.estoque.backend.service.ProdutoService;
import com.api.estoque.backend.service.UserService;

@RestController
@RequestMapping(value = "api/estoque/entrada")
public class EstoqueEntradaController {
    
    @Autowired
    private EstoqueEntradaService service;

    @Autowired
    private FornecedorService fornecedorService;

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private UserService usuarioService;

    @GetMapping
    public ResponseEntity<Page<EstoqueEntrada>>
    findByitensEstoqueProdutoNomeContaining(
        @RequestParam(name = "nome", required = false) String nome,
        @RequestParam(name = "idFilial", required = false) Long filial,
        @PageableDefault(sort = "itensEstoque_id_produto_idProduto", direction = Direction.ASC) Pageable pageable
    ){
        Page<EstoqueEntrada> page = service.findByitensEstoqueProdutoNomeContaining(filial, nome, pageable);
        return ResponseEntity.ok().body(page);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<EstoqueEntradaDTO> findbyId(@PathVariable Long id) {
        EstoqueEntrada estoque = service.findById(id);
        EstoqueEntradaDTO dto = new EstoqueEntradaDTO(estoque);
        
        List<ItemEstoqueEntradaDTO> itensDTO = dto.getItensEstoque().stream().map(x -> {
            ItemEstoqueEntradaDTO item = new ItemEstoqueEntradaDTO();

            item.setFornecedor(x.getFornecedor());
            item.setProduto(x.getProduto());
            item.setFornecedorFK(x.getFornecedor().getIdFornecedor());
            item.setProdutoFK(x.getProduto().getIdProduto());

            item.setQuantidadeAtual(x.getQuantidadeAtual());
            item.setQuantidadeIdeal(x.getQuantidadeIdeal());
            item.setQuantidadeMinima(x.getQuantidadeMinima());
            item.setQuantidadeMaxima(x.getQuantidadeMaxima());

            return item;
        }).collect(Collectors.toList());

        dto.setDataEntrada(estoque.getDataEntrada());
        dto.setUsuarioFK(estoque.getUsuario().getIdUsuario());
        dto.setItensEstoque(itensDTO.stream().collect(Collectors.toSet()));
        return ResponseEntity.ok().body(dto);
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
        UserDTO usuarioDTO = new UserDTO(usuarioService.findById(dto.getUsuarioFK()));
        dto.setUserDTO(usuarioDTO);

        List<ItemEstoqueEntradaDTO> list =  dto.getItensEstoque().stream().map(x -> {
            ItemEstoqueEntradaDTO item = new ItemEstoqueEntradaDTO();
            
            item.setFornecedor(fornecedorService.findById(x.getFornecedorFK()));
            item.setProduto(produtoService.findById(x.getProdutoFK()));
            
            item.setQuantidadeAtual(x.getQuantidadeAtual());
            item.setQuantidadeIdeal(x.getQuantidadeIdeal());
            item.setQuantidadeMinima(x.getQuantidadeMinima());
            item.setQuantidadeMaxima(x.getQuantidadeMaxima());
            return item;
        }).collect(Collectors.toList());

        dto.setItensEstoque(list.stream().collect(Collectors.toSet()));
        EstoqueEntrada estoque = service.fromDto(dto);

        estoque = service.insert(estoque);
        
        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(estoque.getIdEstoque())
            .toUri(); 
        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
