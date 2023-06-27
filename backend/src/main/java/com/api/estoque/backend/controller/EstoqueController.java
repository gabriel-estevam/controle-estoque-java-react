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

    @Autowired
    private FornecedorService serviceFornecedor;
    
    @Autowired
    private ProdutoService serviceProduto;
    
    @Autowired
    private UserService serviceUsuario;

    @GetMapping
    public ResponseEntity<Page<Estoque>>
    findByProdutoContaining(
        @RequestParam(name = "produto", required = false) String produto, 
        @PageableDefault(sort = "id_estoque", direction = Direction.ASC) Pageable pageable
    ) 
    {

        Page<Estoque> page = service.findByNameContaining(produto, pageable);
        return ResponseEntity.ok().body(page);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<EstoqueDTO>> findAll() {
        List<Estoque> list = service.findAll();
        List<EstoqueDTO> listDto = list.stream().map(x -> new EstoqueDTO(x)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }
    
    @GetMapping(value = "/{id}")
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

        wareHouseDTO.setFornecedor(serviceFornecedor.findById(wareHouseDTO.getFornecedorFK()));
        wareHouseDTO.setProduto(serviceProduto.findById(wareHouseDTO.getProdutoFK()));
        wareHouseDTO.setUsuario(serviceUsuario.findById(wareHouseDTO.getUsuarioFK()));
        
        Estoque wareHouse = service.fromDto(wareHouseDTO);
        wareHouse = service.insert(wareHouse);

        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(wareHouse.getIdEstoque())
            .toUri();

        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody EstoqueDTO wareHouseDTO) {
        wareHouseDTO.setIdWareHouse(id);
        
        wareHouseDTO.setFornecedor(serviceFornecedor.findById(wareHouseDTO.getFornecedorFK()));
        wareHouseDTO.setProduto(serviceProduto.findById(wareHouseDTO.getProdutoFK()));
        wareHouseDTO.setUsuario(serviceUsuario.findById(wareHouseDTO.getUsuarioFK()));

        Estoque wareHouse = service.fromDto(wareHouseDTO);
        wareHouse = service.update(id, wareHouse);

        return ResponseEntity.ok().build();
    }
    */
}
