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
import com.api.estoque.backend.dto.ItemPedidoDTO;
import com.api.estoque.backend.dto.PedidoDTO;
import com.api.estoque.backend.dto.UserDTO;
import com.api.estoque.backend.model.Pedido;
import com.api.estoque.backend.service.ProdutoService;
import com.api.estoque.backend.service.FornecedorService;
import com.api.estoque.backend.service.PedidoService;
import com.api.estoque.backend.service.UserService;

@RestController
@RequestMapping(value = "api/pedidos")
public class PedidoController {
    
    @Autowired
    private PedidoService service;
    
    @Autowired
    private UserService usuarioService;
    
    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping
    public ResponseEntity<Page<Pedido>> 
    findByNumeroSol(
        @RequestParam(name = "notaEntrada", required =  false) Long numeroSol,
        @RequestParam(name = "idFilial", required = false) Long filial,
        @PageableDefault(sort = "idPedido", direction = Direction.ASC) Pageable pageable
    ) 
    {
        Page<Pedido> page;
        
        if(numeroSol == null) {
            page = service.findByFilial(filial, pageable);
        }
        else {
            page = service.findByNotaEntrada(numeroSol, filial, pageable);
        }

        return ResponseEntity.ok().body(page);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Pedido> findById(@PathVariable Long id) {
        Pedido pedido = service.findById(id);
        return ResponseEntity.ok().body(pedido);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PedidoDTO>> findAll() {
        List<Pedido> list = service.findAll();
        List<PedidoDTO> listDto = list.stream().map(x -> new PedidoDTO(x)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }

   @PostMapping
    public ResponseEntity<Void> insert(@RequestBody PedidoDTO dto) {

        UserDTO usuarioDTO = new UserDTO(usuarioService.findById(dto.getSolicitanteFK()));        
        dto.setSolicitante(usuarioDTO);

        FornecedorDTO fornecedorDTO = new FornecedorDTO(fornecedorService.findById(dto.getFornecedorFK()));
        dto.setFornecedor(fornecedorDTO);

        List<ItemPedidoDTO> list = dto.getItens().stream().map(x -> {
            ItemPedidoDTO item = new ItemPedidoDTO();
            item.setProduto(produtoService.findById(x.getProdutoFK()));
            item.setQuantidade(x.getQuantidade());
            item.setValorUnitario(x.getValorUnitario());
            item.setValorTotal(x.getQuantidade() * x.getValorUnitario());
            return item;
        }).collect(Collectors.toList());

        dto.setItens(list.stream().collect(Collectors.toSet()));
        
        Pedido pedido = service.fromDto(dto);
        
        pedido = service.insert(pedido);
        
        URI uri = ServletUriComponentsBuilder
        .fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(pedido.getIdPedido())
        .toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody PedidoDTO dto) {
        dto.setIdPedido(id);
        Pedido pedido = service.fromDto(dto);
        service.update(id, pedido);
        return ResponseEntity.noContent().build();
    }
}
