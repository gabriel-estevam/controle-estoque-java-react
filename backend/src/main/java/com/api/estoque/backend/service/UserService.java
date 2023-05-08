package com.api.estoque.backend.service;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.dto.UserDTO;
import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.model.Filial;
import com.api.estoque.backend.repository.FilialRepository;
import com.api.estoque.backend.repository.UsuarioRepository;
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;
import com.api.estoque.backend.service.exceptions.ModelException;

@Service
public class UserService {

    @Autowired
    private UsuarioRepository repository;
    
    @Autowired 
    private FilialRepository filialRepository;

    public Page<Usuario> findByNameContaining(String name, Pageable pageable) {
        return repository.findByNameContaining(name, pageable);
    }

    public Usuario findById(Long id) {
        Optional<Usuario> user = repository.findById(id);
        return user.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Usuario insert(Usuario User) {
        return repository.save(User);
    }

    public void delete(Long id) {
        Usuario usuarioI = findById(id);
        Optional<Filial> fOptional = filialRepository.findByUsuario(usuarioI); //Verifica se o usuário é ADMIN de alguma filial
        if(!fOptional.isEmpty()) {
            throw new DataBaseException("Não é possivel deletar Usuario[" + fOptional.get().getUsuario().getName()+ "] Pois o mesmo é ADMINISTRADOR da filial [" + fOptional.get().getName() + "]");
        }
        else 
        {
            try {
                repository.deleteById(id);
            } 
            catch (EmptyResultDataAccessException e) {
                throw new ResourceNotFoundException(id);
            } 
        }
    }

    public Usuario update(Long id, Usuario user) {
        try {
            Usuario entity = repository.getReferenceById(id);// prepara o objeto monitorando sem consultar no banco de dados
            updateData(entity, user);
            return repository.save(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    private void updateData(Usuario entity, Usuario user) {
        entity.setName(user.getName());
        entity.setEmail(user.getEmail());
       // entity.setPassword(user.getPassword());
        entity.setStatus(user.getStatus());
        entity.setRole(user.getRole());
        entity.setFilial(user.getFilial());
    }

    public Usuario fromDto(UserDTO objDto) {
        return userExists(objDto);
    }

    private Usuario userExists(UserDTO objDto) {
        Optional<Usuario> userDTO;
        if (objDto.getIdUsuario() == null) {
            // User
            userDTO = repository.findByEmail(objDto.getEmail());
        } else {
            userDTO = repository.findByEmailAndIdUsuarioNot(objDto.getEmail(), objDto.getIdUsuario());
        }
        // User
        if (userDTO.isEmpty()) {
            return new Usuario(objDto.getIdUsuario(), 
                               objDto.getName(), 
                               objDto.getEmail(), 
                               objDto.getPassword(),
                               objDto.getRole(),
                               objDto.getStatus());
        } else {
            throw new ModelException("Usuário Já cadastrado!");
        }
    }
}
