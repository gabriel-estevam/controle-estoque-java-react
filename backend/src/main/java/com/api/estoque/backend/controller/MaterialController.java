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

import com.api.estoque.backend.dto.MaterialDTO;
import com.api.estoque.backend.model.Material;
import com.api.estoque.backend.service.FornecedorService;
import com.api.estoque.backend.service.ProdutoService;
import com.api.estoque.backend.service.UserService;
import com.api.estoque.backend.service.MaterialService;

@RestController
@RequestMapping(value = "api/materiais")
public class MaterialController {

    @Autowired
    private MaterialService service;

    @Autowired
    private FornecedorService serviceFornecedor;
    
    @Autowired
    private ProdutoService serviceProduto;
    
    @Autowired
    private UserService serviceUsuario;

    @GetMapping
    public ResponseEntity<Page<Material>>
    findByProdutoContaining(
        @RequestParam(name = "produto", required = false) String produto, 
        @PageableDefault(sort = "id_material", direction = Direction.ASC) Pageable pageable
    ) 
    {

        Page<Material> page = service.findByNameContaining(produto, pageable);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<MaterialDTO>> findAll() {
        List<Material> list = service.findAll();
        List<MaterialDTO> listDto = list.stream().map(x -> new MaterialDTO(x)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }
    
    @GetMapping(value = "/{id}")
    public ResponseEntity<MaterialDTO> findByid(@PathVariable Long id) {
        Material wareHouse = service.findById(id);
        
        MaterialDTO materialDTO = new MaterialDTO(wareHouse);
        materialDTO.setFornecedorFK(wareHouse.getFornecedor().getIdFornecedor());
        materialDTO.setProdutoFK(wareHouse.getProduto().getIdProduto());
        materialDTO.setUsuarioFK(wareHouse.getUsuario().getIdUsuario());

        return ResponseEntity.ok().body(materialDTO);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody MaterialDTO materialDTO) {

        materialDTO.setFornecedor(serviceFornecedor.findById(materialDTO.getFornecedorFK()));
        materialDTO.setProduto(serviceProduto.findById(materialDTO.getProdutoFK()));
        materialDTO.setUsuario(serviceUsuario.findById(materialDTO.getUsuarioFK()));
        
        Material wareHouse = service.fromDto(materialDTO);
        wareHouse = service.insert(wareHouse);

        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(wareHouse.getIdMaterial())
            .toUri();

        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody MaterialDTO materialDTO) {
        materialDTO.setIdMaterial(id);
        
        materialDTO.setFornecedor(serviceFornecedor.findById(materialDTO.getFornecedorFK()));
        materialDTO.setProduto(serviceProduto.findById(materialDTO.getProdutoFK()));
        materialDTO.setUsuario(serviceUsuario.findById(materialDTO.getUsuarioFK()));

        Material wareHouse = service.fromDto(materialDTO);
        wareHouse = service.update(id, wareHouse);

        return ResponseEntity.ok().build();
    }
    
}
