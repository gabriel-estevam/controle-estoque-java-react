package com.api.estoque.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.dto.EstoqueEntradaDTO;
import com.api.estoque.backend.dto.ItemEstoqueEntradaDTO;
import com.api.estoque.backend.model.EstoqueEntrada;
import com.api.estoque.backend.model.Fornecedor;
import com.api.estoque.backend.model.ItemEstoqueEntrada;
import com.api.estoque.backend.model.Produto;
import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.repository.EstoqueEntradaRepository;
import com.api.estoque.backend.repository.ItemEstoqueEntradaRepository;
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ModelException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
public class EstoqueEntradaService {

    @Autowired
    private EstoqueEntradaRepository repository;

    @Autowired
    private ItemEstoqueEntradaRepository itemEstoqueEntradaRepository;

    @Autowired
    private FilialService filialService;

    public Page<EstoqueEntrada> findByitensEstoqueProdutoNomeContaining(Long filial,String nome, Pageable pageable) {
        return repository.findByFilial_idFilialAndItensEstoque_id_produto_nomeContaining(filial, nome, pageable);
    }
    
    public EstoqueEntrada findById(Long id) {
        Optional<EstoqueEntrada> estoque = repository.findById(id);
        return estoque.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public List<EstoqueEntrada> findAll() {
        return repository.findAll();
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

    public EstoqueEntrada insert(EstoqueEntrada estoqueEntrada) {
        EstoqueEntrada estoqueEntradaSave = estoqueEntrada;

        estoqueEntradaSave = repository.save(estoqueEntrada);
        
        itemEstoqueEntradaRepository.saveAll(estoqueEntrada.getItemEstoque());

        return estoqueEntradaSave;
    }

    public EstoqueEntrada fromDto(EstoqueEntradaDTO dto) {
        return EstoqueExists(dto);
    }

    private EstoqueEntrada EstoqueExists(EstoqueEntradaDTO dto) {
        Optional<EstoqueEntrada> estoqueEntrada = null;
        Produto produto = findProdutoFromItem(dto);
        Fornecedor fornecedor = findFornecedorFromItem(dto);
        if(dto.getIdEstoque() == null) {
            estoqueEntrada = repository.findByFilial_idFilialAndItensEstoque_id_produto_idProdutoAndItensEstoque_fornecedor_idFornecedor(
                produto.getIdProduto(),
                fornecedor.getIdFornecedor(),
                dto.getFilialFK()
            );
        }

        if(estoqueEntrada.isEmpty()) 
        {
            EstoqueEntrada estoqueEntradaObj = new EstoqueEntrada();

            Usuario usuario = new Usuario();

            usuario.setIdUsuario(dto.getUserDTO().getIdUsuario());
            usuario.setName(dto.getUserDTO().getName());
            usuario.setEmail(dto.getUserDTO().getEmail());
            usuario.setRole(dto.getUserDTO().getRole());
            usuario.setStatus(dto.getUserDTO().getStatus());
            usuario.setFilial(dto.getUserDTO().getFilial());

            estoqueEntradaObj.setIdEstoque(dto.getIdEstoque());
            estoqueEntradaObj.setDataEntrada(dto.getDataEntrada());
            estoqueEntradaObj.setUsuario(usuario);

            List<ItemEstoqueEntrada> itens = dto.getItensEstoque().stream().map(x -> {
                ItemEstoqueEntrada item = new ItemEstoqueEntrada();
                item.setFornecedor(x.getFornecedor());
                item.setEstoqueEntrada(estoqueEntradaObj);
                item.setProduto(x.getProduto());
                item.setQuantidadeAtual(x.getQuantidadeAtual());
                item.setQuantidadeIdeal(x.getQuantidadeIdeal());
                item.setQuantidadeMinima(x.getQuantidadeMinima());
                item.setQuantidadeMaxima(x.getQuantidadeMaxima());
                return item;
            }).collect(Collectors.toList());

            estoqueEntradaObj.AddItensEstoque(itens.stream().collect(Collectors.toSet()));
            estoqueEntradaObj.setFilial(filialService.findById(dto.getFilialFK()));
            
            return estoqueEntradaObj;
        }
        else 
        {
            throw new ModelException(
                "Produto: "+
                produto.getNome()+
                " Unidade de Medida: "+
                produto.getUnidadeMedida().getSigla()+
                " Fornecedor: "+
                fornecedor.getName()+ " já cadastrado no estoque!"
            );
        }
    }

    private Produto findProdutoFromItem(EstoqueEntradaDTO dto) {
        Produto produto;

        List<ItemEstoqueEntradaDTO> list = dto.getItensEstoque().stream().collect(Collectors.toList());
        produto = list.iterator().next().getProduto();
        return produto;
    }

    private Fornecedor findFornecedorFromItem(EstoqueEntradaDTO dto) {
        Fornecedor fornecedor;
        List<ItemEstoqueEntradaDTO> list = dto.getItensEstoque().stream().collect(Collectors.toList());
        fornecedor = list.iterator().next().getFornecedor();
        return fornecedor;
    }

    public Double movimentaEstoque(EstoqueEntrada estoqueAtual, Double quantidadeMovimentada) {
        Double qtdAtual = 0.0;
        Double movimento = 0.0;
        qtdAtual = estoqueAtual.getItemEstoque().iterator().next().getQuantidadeAtual();
        movimento = (qtdAtual - quantidadeMovimentada);
        return movimento;
    }
}
