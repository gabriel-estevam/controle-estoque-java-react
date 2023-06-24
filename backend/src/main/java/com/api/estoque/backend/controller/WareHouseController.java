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

import com.api.estoque.backend.dto.WareHouseDTO;
import com.api.estoque.backend.model.WareHouse;
import com.api.estoque.backend.service.FornecedorService;
import com.api.estoque.backend.service.ProdutoService;
import com.api.estoque.backend.service.UserService;
import com.api.estoque.backend.service.WareHouseService;

@RestController
@RequestMapping(value = "api/wareHouse")
public class WareHouseController {

    @Autowired
    private WareHouseService service;

    @Autowired
    private FornecedorService serviceFornecedor;
    
    @Autowired
    private ProdutoService serviceProduto;
    
    @Autowired
    private UserService serviceUsuario;

    @GetMapping
    public ResponseEntity<Page<WareHouse>>
    findByProdutoContaining(
        @RequestParam(name = "produto", required = false) String produto, 
        @PageableDefault(sort = "id_ware_house", direction = Direction.ASC) Pageable pageable
    ) 
    {

        Page<WareHouse> page = service.findByNameContaining(produto, pageable);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<WareHouseDTO>> findAll() {
        List<WareHouse> list = service.findAll();
        List<WareHouseDTO> listDto = list.stream().map(x -> new WareHouseDTO(x)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }
    
    @GetMapping(value = "/{id}")
    public ResponseEntity<WareHouseDTO> findByid(@PathVariable Long id) {
        WareHouse wareHouse = service.findById(id);
        
        WareHouseDTO wareHouseDTO = new WareHouseDTO(wareHouse);
        wareHouseDTO.setFornecedorFK(wareHouse.getFornecedor().getIdFornecedor());
        wareHouseDTO.setProdutoFK(wareHouse.getProduto().getIdProduto());
        wareHouseDTO.setUsuarioFK(wareHouse.getUsuario().getIdUsuario());

        return ResponseEntity.ok().body(wareHouseDTO);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody WareHouseDTO wareHouseDTO) {

        wareHouseDTO.setFornecedor(serviceFornecedor.findById(wareHouseDTO.getFornecedorFK()));
        wareHouseDTO.setProduto(serviceProduto.findById(wareHouseDTO.getProdutoFK()));
        wareHouseDTO.setUsuario(serviceUsuario.findById(wareHouseDTO.getUsuarioFK()));
        
        WareHouse wareHouse = service.fromDto(wareHouseDTO);
        wareHouse = service.insert(wareHouse);

        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(wareHouse.getIdWareHouse())
            .toUri();

        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody WareHouseDTO wareHouseDTO) {
        wareHouseDTO.setIdWareHouse(id);
        
        wareHouseDTO.setFornecedor(serviceFornecedor.findById(wareHouseDTO.getFornecedorFK()));
        wareHouseDTO.setProduto(serviceProduto.findById(wareHouseDTO.getProdutoFK()));
        wareHouseDTO.setUsuario(serviceUsuario.findById(wareHouseDTO.getUsuarioFK()));

        WareHouse wareHouse = service.fromDto(wareHouseDTO);
        wareHouse = service.update(id, wareHouse);

        return ResponseEntity.ok().build();
    }
    
}
