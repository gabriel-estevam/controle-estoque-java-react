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

import com.api.estoque.backend.dto.MaterialDTO;
import com.api.estoque.backend.model.Material;
import com.api.estoque.backend.repository.MaterialRepository;
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ModelException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
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

    public Material update(Long id, Material material) {
        try {
            Material entity = repository.getReferenceById(id);
            updateData(entity, material);
            return repository.save(entity);
        } 
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

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
            return new Material(
                objDto.getIdMaterial(),
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
    
}
