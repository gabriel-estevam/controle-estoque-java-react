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

<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/controller/EstoqueController.java
import com.api.estoque.backend.dto.EstoqueDTO;
import com.api.estoque.backend.model.Estoque;
import com.api.estoque.backend.service.FornecedorService;
import com.api.estoque.backend.service.ProdutoService;
import com.api.estoque.backend.service.UserService;
import com.api.estoque.backend.service.EstoqueService;

@RestController
@RequestMapping(value = "api/estoque")
public class EstoqueController {

    @Autowired
    private EstoqueService service;
========
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
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/controller/MaterialController.java

    @Autowired
    private FornecedorService serviceFornecedor;
    
    @Autowired
    private ProdutoService serviceProduto;
    
    @Autowired
    private UserService serviceUsuario;

    @GetMapping
<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/controller/EstoqueController.java
    public ResponseEntity<Page<Estoque>>
    findByProdutoContaining(
        @RequestParam(name = "produto", required = false) String produto, 
        @PageableDefault(sort = "id_estoque", direction = Direction.ASC) Pageable pageable
    ) 
    {

        Page<Estoque> page = service.findByNameContaining(produto, pageable);
========
    public ResponseEntity<Page<Material>>
    findByProdutoContaining(
        @RequestParam(name = "produto", required = false) String produto, 
        @PageableDefault(sort = "id_material", direction = Direction.ASC) Pageable pageable
    ) 
    {

        Page<Material> page = service.findByNameContaining(produto, pageable);
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/controller/MaterialController.java
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/all")
<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/controller/EstoqueController.java
    public ResponseEntity<List<EstoqueDTO>> findAll() {
        List<Estoque> list = service.findAll();
        List<EstoqueDTO> listDto = list.stream().map(x -> new EstoqueDTO(x)).collect(Collectors.toList());
========
    public ResponseEntity<List<MaterialDTO>> findAll() {
        List<Material> list = service.findAll();
        List<MaterialDTO> listDto = list.stream().map(x -> new MaterialDTO(x)).collect(Collectors.toList());
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/controller/MaterialController.java
        return ResponseEntity.ok().body(listDto);
    }
    
    @GetMapping(value = "/{id}")
<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/controller/EstoqueController.java
    public ResponseEntity<EstoqueDTO> findByid(@PathVariable Long id) {
        Estoque wareHouse = service.findById(id);
        
        EstoqueDTO wareHouseDTO = new EstoqueDTO(wareHouse);
       /* wareHouseDTO.setFornecedorFK(wareHouse.getFornecedor().getIdFornecedor());
        wareHouseDTO.setProdutoFK(wareHouse.getProduto().getIdProduto());
        wareHouseDTO.setUsuarioFK(wareHouse.getUsuario().getIdUsuario());
*/
        return ResponseEntity.ok().body(wareHouseDTO);
    }

   // @PostMapping
   /* public ResponseEntity<Void> insert(@RequestBody EstoqueDTO wareHouseDTO) {
========
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
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/controller/MaterialController.java

        materialDTO.setFornecedor(serviceFornecedor.findById(materialDTO.getFornecedorFK()));
        materialDTO.setProduto(serviceProduto.findById(materialDTO.getProdutoFK()));
        materialDTO.setUsuario(serviceUsuario.findById(materialDTO.getUsuarioFK()));
        
<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/controller/EstoqueController.java
        Estoque wareHouse = service.fromDto(wareHouseDTO);
========
        Material wareHouse = service.fromDto(materialDTO);
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/controller/MaterialController.java
        wareHouse = service.insert(wareHouse);

        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/controller/EstoqueController.java
            .buildAndExpand(wareHouse.getIdEstoque())
========
            .buildAndExpand(wareHouse.getIdMaterial())
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/controller/MaterialController.java
            .toUri();

        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/controller/EstoqueController.java
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody EstoqueDTO wareHouseDTO) {
        wareHouseDTO.setIdWareHouse(id);
========
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody MaterialDTO materialDTO) {
        materialDTO.setIdMaterial(id);
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/controller/MaterialController.java
        
        materialDTO.setFornecedor(serviceFornecedor.findById(materialDTO.getFornecedorFK()));
        materialDTO.setProduto(serviceProduto.findById(materialDTO.getProdutoFK()));
        materialDTO.setUsuario(serviceUsuario.findById(materialDTO.getUsuarioFK()));

<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/controller/EstoqueController.java
        Estoque wareHouse = service.fromDto(wareHouseDTO);
========
        Material wareHouse = service.fromDto(materialDTO);
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/controller/MaterialController.java
        wareHouse = service.update(id, wareHouse);

        return ResponseEntity.ok().build();
    }
    */
}
