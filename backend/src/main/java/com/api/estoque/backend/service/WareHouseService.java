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

import com.api.estoque.backend.dto.WareHouseDTO;
import com.api.estoque.backend.model.WareHouse;
import com.api.estoque.backend.repository.WareHouseRepository;
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ModelException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
public class WareHouseService {
    
    @Autowired
    private WareHouseRepository repository;

    public Page<WareHouse> findByNameContaining(String produto,  Pageable pageable) {
        return repository.findByProdutoContaining(produto, pageable);
    }

    public List<WareHouse> findAll() {
        return repository.findAll();
    }
    
    public WareHouse findById(Long id) {
        Optional<WareHouse> WareHouse = repository.findById(id);
        return WareHouse.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public WareHouse insert(WareHouse wareHouse) {
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

    public WareHouse update(Long id, WareHouse WareHouse) {
        try {
            WareHouse entity = repository.getReferenceById(id);
            updateData(entity, WareHouse);
            return repository.save(entity);
        } 
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    public void updateData(WareHouse entity, WareHouse WareHouse) {
        entity.setQuantidadeAtual(WareHouse.getQuantidadeAtual());
        entity.setQuantidadeIdeal(WareHouse.getQuantidadeIdeal());
        entity.setQuantidadeMinima(WareHouse.getQuantidadeMinima());
        entity.setQuantidadeMaxima(WareHouse.getQuantidadeMaxima());
        entity.setProduto(WareHouse.getProduto());
        entity.setFornecedor(WareHouse.getFornecedor());
        entity.setStatus(WareHouse.getStatus());
        entity.setUsuario(WareHouse.getUsuario());
    }

    public WareHouse fromDto(WareHouseDTO objDto) {
        return wareHouseExists(objDto);
    }

    public WareHouse wareHouseExists(WareHouseDTO objDto) {
        Optional<WareHouse> wareHouse;

        if(objDto.getIdWareHouse() == null) 
        {
            wareHouse = repository.findByProduto(objDto.getProduto());
        } 
        else 
        {
            wareHouse = repository.findByProdutoAndFornecedorAndIdWareHouseNot(objDto.getProduto(), objDto.getFornecedor() ,objDto.getIdWareHouse());
        }

        if(wareHouse.isEmpty()) 
        {   
            return new WareHouse(
                objDto.getIdWareHouse(),
                objDto.getStatus(),
                objDto.getDataEntrada(),
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
                "Produto ["+objDto.getProduto().getNome()+"] já cadastrado!"
            );
        }
    }
    
}
