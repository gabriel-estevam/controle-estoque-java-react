package com.api.estoque.backend.service;

import java.util.Optional;
import java.util.Set;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.dto.EstoqueSaidaDTO;
import com.api.estoque.backend.model.EstoqueEntrada;
import com.api.estoque.backend.model.EstoqueSaida;
import com.api.estoque.backend.model.ItemEstoqueEntrada;
import com.api.estoque.backend.repository.EstoqueSaidaRepository;
import com.api.estoque.backend.service.exceptions.ModelException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
public class EstoqueSaidaService {
    
    @Autowired
    private EstoqueSaidaRepository repository;

    @Autowired
    private EstoqueEntradaService estoqueEntradaService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private FornecedorService fornecedorService;
    
    public EstoqueSaida findById(Long id) {
        Optional<EstoqueSaida> estoqueSaida = repository.findById(id);
        return estoqueSaida.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public EstoqueSaida fromDto(EstoqueSaidaDTO dto) {
        EstoqueSaida obj = new EstoqueSaida(
            dto.getId(), 
            dto.getQuantidade(),
            dto.getData(),
            userService.findById(dto.getUsuarioFK()), 
            userService.findById(dto.getFilialFK()).getFilial(), 
            estoqueEntradaService.findById(dto.getEstoqueEntradaFK()),
            produtoService.findById(dto.getProdutoFK()),
            fornecedorService.findById(dto.getFornecedorFK())
        );
        return obj;
    }

    public EstoqueSaida insert(EstoqueSaida estoqueSaida) {
        Optional<EstoqueSaida> estoqueOptional = findProdutoFromEstoque(estoqueSaida);

        EstoqueEntrada entrada = estoqueSaida.getEstoque();
        Set <ItemEstoqueEntrada> itensEntrada = estoqueSaida.getEstoque().getItemEstoque();

        Double valor = 0.0;

        if(estoqueSaida.getQuantidade() > entrada.getItemEstoque().iterator().next().getQuantidadeAtual()) {
            throw new ModelException("Quantidade informada MAIOR que quantidade atual");
        }
        
        valor = estoqueEntradaService.movimentaEstoque(entrada, estoqueSaida.getQuantidade());
            
        itensEntrada.iterator().next().setQuantidadeAtual(valor);
        entrada.AddItensEstoque(itensEntrada);

        if(estoqueOptional.isEmpty()) 
        {
            return repository.save(estoqueSaida);    
        }
        else 
        {
            EstoqueSaida estoqueUpdated = update(estoqueOptional.get().getId(), estoqueSaida);
            return estoqueUpdated;
        }
    }

    public Optional<EstoqueSaida> findProdutoFromEstoque(EstoqueSaida estoqueSaida) {
        Optional<EstoqueSaida> estoque = repository.findByEstoque_idEstoqueAndProduto_idProdutoAndFornecedor_idFornecedor(
            estoqueSaida.getEstoque().getIdEstoque(), 
            estoqueSaida.getProduto().getIdProduto(), 
            estoqueSaida.getFornecedor().getIdFornecedor()
        );
        return estoque;
    }

    public EstoqueSaida update(Long id, EstoqueSaida estoqueSaida) {
        try 
        {
            EstoqueSaida entity = repository.getReferenceById(id);
            updateData(entity, estoqueSaida);
            return repository.save(entity);    
        } 
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }
    public void updateData(EstoqueSaida entity, EstoqueSaida estoqueSaida) {
        entity.setData(estoqueSaida.getData());
        entity.setEstoque(estoqueSaida.getEstoque());
        entity.setFilial(estoqueSaida.getFilial());
        entity.setProduto(estoqueSaida.getProduto());
        entity.setFornecedor(estoqueSaida.getFornecedor());
        entity.setUsuario(estoqueSaida.getUsuario());
        entity.setQuantidade((estoqueSaida.getQuantidade() + entity.getQuantidade()));
    }

    public Page<EstoqueSaida> findByIdFilialAndProdutoContaning(Long filial, String produto, Pageable pageable) {
        return repository.findByFilial_idFilialAndEstoque_ItensEstoque_id_produto_nomeContaining(filial, produto, pageable);
    }
}