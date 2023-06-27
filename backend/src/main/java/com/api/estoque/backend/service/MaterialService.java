package com.api.estoque.backend.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/service/EstoqueService.java
import com.api.estoque.backend.dto.EstoqueDTO;
import com.api.estoque.backend.model.Estoque;
import com.api.estoque.backend.repository.EstoqueRepository;
========
import com.api.estoque.backend.dto.MaterialDTO;
import com.api.estoque.backend.model.Material;
import com.api.estoque.backend.repository.MaterialRepository;
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/service/MaterialService.java
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ModelException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/service/EstoqueService.java
public class EstoqueService {
    
    @Autowired
    private EstoqueRepository repository;

    public Page<Estoque> findByNameContaining(String produto,  Pageable pageable) {
        return repository.findByProdutoContaining(produto, pageable);
    }

    public List<Estoque> findAll() {
        return repository.findAll();
    }
    
    public Estoque findById(Long id) {
        Optional<Estoque> WareHouse = repository.findById(id);
        return WareHouse.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Estoque insert(Estoque wareHouse) {
========
public class MaterialService {
    
    @Autowired
    private MaterialRepository repository;

    public Page<Material> findByNameContaining(String produto,  Pageable pageable) {
        return repository.findByProdutoContaining(produto, pageable);
    }

    public List<Material> findAll() {
        return repository.findAll();
    }
    
    public Material findById(Long id) {
        Optional<Material> material = repository.findById(id);
        return material.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Material insert(Material wareHouse) {
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/service/MaterialService.java
        return repository.save(wareHouse);
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataBaseException(e.getMessage());
        }
    }

<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/service/EstoqueService.java
    public Estoque update(Long id, Estoque WareHouse) {
        try {
            Estoque entity = repository.getReferenceById(id);
            updateData(entity, WareHouse);
========
    public Material update(Long id, Material material) {
        try {
            Material entity = repository.getReferenceById(id);
            updateData(entity, material);
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/service/MaterialService.java
            return repository.save(entity);
        } 
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/service/EstoqueService.java
    public void updateData(Estoque entity, Estoque WareHouse) {

        entity.setUsuario(WareHouse.getUsuario());
    }

  /*  public Estoque fromDto(EstoqueDTO objDto) {
        return wareHouseExists(objDto);
    }
*/
    /*public Estoque wareHouseExists(EstoqueDTO objDto) {
        Optional<Estoque> wareHouse;
========
    public void updateData(Material entity, Material material) {
        entity.setQuantidadeAtual(material.getQuantidadeAtual());
        entity.setQuantidadeIdeal(material.getQuantidadeIdeal());
        entity.setQuantidadeMinima(material.getQuantidadeMinima());
        entity.setQuantidadeMaxima(material.getQuantidadeMaxima());
        entity.setProduto(material.getProduto());
        entity.setFornecedor(material.getFornecedor());
        entity.setStatus(material.getStatus());
        entity.setUsuario(material.getUsuario());
    }

    public Material fromDto(MaterialDTO objDto) {
        return wareHouseExists(objDto);
    }

    public Material wareHouseExists(MaterialDTO objDto) {
        Optional<Material> wareHouse;
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/service/MaterialService.java

        if(objDto.getIdMaterial() == null) 
        {
            wareHouse = repository.findByProduto(objDto.getProduto());
        } 
        else 
        {
            wareHouse = repository.findByProdutoAndFornecedorAndIdMaterialNot(objDto.getProduto(), objDto.getFornecedor() ,objDto.getIdMaterial());
        }

        if(wareHouse.isEmpty()) 
        {   
<<<<<<<< HEAD:backend/src/main/java/com/api/estoque/backend/service/EstoqueService.java
            return new Estoque(
                objDto.getIdWareHouse(),
========
            return new Material(
                objDto.getIdMaterial(),
>>>>>>>> 8f9a0d23c736f74c6f41098868d3d20500b4c646:backend/src/main/java/com/api/estoque/backend/service/MaterialService.java
                objDto.getStatus(),
                objDto.getFornecedor(),
                objDto.getUsuario(),
                objDto.getProduto(),
                objDto.getQuantidadeMinima(),
                objDto.getQuantidadeMaxima(),
                objDto.getQuantidadeIdeal(),
                objDto.getQuantidadeAtual()
            );
        } 
        else 
        {
            throw new ModelException(
                "Material ["+objDto.getProduto().getNome()+"] já cadastrado!"
            );
        }
    }
    */
}
