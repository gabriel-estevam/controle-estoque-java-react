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

import com.api.estoque.backend.dto.ProdutoDTO;
import com.api.estoque.backend.model.Produto;
import com.api.estoque.backend.repository.ProdutoRepository;
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ModelException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository repository;

    public Page<Produto> findByNameContaining(String name,  Pageable pageable) {
        return repository.findByNomeContaining(name, pageable);
    }
    
    public List<Produto> findAll() {
        return repository.findAll();
    }
    public Produto findById(Long id) {
        Optional<Produto> filial = repository.findById(id);
        return filial.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Produto insert(Produto filial) {
        return repository.save(filial);
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

    public Produto update(Long id, Produto produto) {
        try {
            Produto entity = repository.getReferenceById(id);
            updateData(entity, produto);
            return repository.save(entity);
        } 
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    public void updateData(Produto entity, Produto produto) {
        entity.setNome(produto.getNome());
        entity.setUnidadeMedida(produto.getUnidadeMedida());
        entity.setStatus(produto.getStatus());
    }

    public Produto fromDto(ProdutoDTO objDto) {
        return produtoExists(objDto);
    }

    public Produto produtoExists(ProdutoDTO objDto) {
        Optional<Produto> produto;
        if(objDto.getIdProduto() == null) {
            produto = repository.findByNomeAndUnidadeMedida(objDto.getNome(), objDto.getUnidadeMedida());
        } else {
           produto = repository.findByNomeAndUnidadeMedidaAndIdProdutoNot(objDto.getNome(), objDto.getUnidadeMedida(), objDto.getIdProduto());
        }

        if(produto.isEmpty()) {
            return new Produto(objDto.getIdProduto(),objDto.getNome(), objDto.getStatus(),objDto.getUnidadeMedida());
        } else {
            throw new ModelException("Produto [Nome: "+objDto.getNome()+" Unidade de Medida: "+objDto.getUnidadeMedida().getUnidadeMedida()+"] já cadastrado!");
        }
    }

}
