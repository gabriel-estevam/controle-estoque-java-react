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

import com.api.estoque.backend.dto.EstoqueDTO;
import com.api.estoque.backend.model.Estoque;
import com.api.estoque.backend.repository.EstoqueRepository;
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ModelException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
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

    public Estoque update(Long id, Estoque WareHouse) {
        try {
            Estoque entity = repository.getReferenceById(id);
            updateData(entity, WareHouse);
            return repository.save(entity);
        } 
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    public void updateData(Estoque entity, Estoque WareHouse) {

        entity.setUsuario(WareHouse.getUsuario());
    }

  /*  public Estoque fromDto(EstoqueDTO objDto) {
        return wareHouseExists(objDto);
    }
*/
    /*public Estoque wareHouseExists(EstoqueDTO objDto) {
        Optional<Estoque> wareHouse;

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
            return new Estoque(
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
    */
}
