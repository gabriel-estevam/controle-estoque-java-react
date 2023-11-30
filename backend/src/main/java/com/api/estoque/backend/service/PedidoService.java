package com.api.estoque.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.dto.PedidoDTO;
import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.model.Fornecedor;
import com.api.estoque.backend.model.ItemPedido;
import com.api.estoque.backend.model.Pedido;
import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.repository.ItemPedidoRepository;
import com.api.estoque.backend.repository.PedidoRepository;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;

@Service
public class PedidoService {
    
    @Autowired
    private PedidoRepository repository;

    @Autowired
    private ItemPedidoRepository itemRepository;

    @Autowired
    private FilialService filialService;

    @Autowired
    private UserService usuarioService;

    @Autowired
    private FornecedorService fornecedorService;

    public Page<Pedido> findByNotaEntrada(Long numeroSol, Long filial, Pageable pageable) {
        return repository.findByNotaEntradaAndFilial_idFilial(numeroSol, filial,pageable);
    }

    public Page<Pedido> findByFilial(Long filial, Pageable pageable) {
        return repository.findByFilial_idFilial(filial, pageable);
    }

    public List<Pedido> findAll() {
        return repository.findAll();
    }

    public Pedido findById(Long id) {
        Optional<Pedido> pedido = repository.findById(id);
        return pedido.orElseThrow(() -> new ResourceNotFoundException(id));
    }
    public Pedido insert(Pedido pedido) {
        Pedido pedidoSave = pedido;
        pedidoSave = repository.save(pedido);
        
        itemRepository.saveAll(pedido.getItens());
        return pedidoSave;
    }

    public void update(Long id, Pedido pedido) {
        Pedido entity = repository.getReferenceById(id);
        updateData(entity, pedido);
        repository.save(entity);
    }

    private void updateData(Pedido entity, Pedido pedido) {
        entity.setStatus(pedido.getStatus());
    }

    public Pedido fromDto(PedidoDTO dto) {
        Pedido pedido = new Pedido();
        Filial filial = filialService.findById(dto.getFilialFK());
        Usuario usuario = usuarioService.findById(dto.getSolicitanteFK());
        Fornecedor fornecedor = fornecedorService.findById(dto.getFornecedorFK());

        pedido.setIdPedido(dto.getIdPedido());
        pedido.setNotaEntrada(dto.getNotaEntrada());
        pedido.setStatus(dto.getStatus());
        pedido.setDataEntrega(dto.getDataEntrega());
        pedido.setDataSolicitado(dto.getDataSolicitado());
        pedido.setFilial(filial);
        pedido.setSolicitante(usuario);
        pedido.setFornecedor(fornecedor);

        List<ItemPedido> itens = dto.getItens().stream().map(x -> {
            ItemPedido item = new ItemPedido();
            item.setPedido(pedido);
            item.setProduto(x.getProduto());
            item.setQuantidade(x.getQuantidade());
            item.setValorUnitario(x.getValorUnitario());
            item.setValorTotal(x.getValorTotal());
            return item;
        }).collect(Collectors.toList());

        pedido.AddItens(itens.stream().collect(Collectors.toSet()));
        return pedido;
    }
}