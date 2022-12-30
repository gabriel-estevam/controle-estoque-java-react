package com.api.estoque.backend.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.dto.UserDTO;
import com.api.estoque.backend.model.UserModel;
import com.api.estoque.backend.repository.UserRepository;
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;
import com.api.estoque.backend.service.exceptions.UserException;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<UserModel> findAll() {
        return repository.findAll();
    }

    public UserModel findById(Long id) {
        Optional<UserModel> User = repository.findById(id);
        return User.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public UserModel insert(UserModel User) {
        return repository.save(User);
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

    public UserModel update(Long id, UserModel User) {
        try {
            UserModel entity = repository.getReferenceById(id); // prepara o objeto monitorando sem consultar no banco
                                                                // de
            // dados
            updateData(entity, User);
            return repository.save(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    private void updateData(UserModel entity, UserModel User) {
        entity.setName(User.getName());
        entity.setEmail(User.getEmail());
        entity.setPassword(User.getPassword());
        entity.setStatus(User.getStatus());
        entity.setRole(User.getRole());
    }

    public UserModel fromDto(UserDTO objDto) {
        return userExists(objDto);
    }

    private UserModel userExists(UserDTO objDto) {
        Optional<UserModel> UserDTO;
        if (objDto.getId() == null) {
            // User
            UserDTO = repository.findByEmail(objDto.getEmail());
        } else {
            UserDTO = repository.findByEmailAndIdNot(objDto.getEmail(), objDto.getId());
        }
        // User
        if (UserDTO.isEmpty()) {
            return new UserModel(objDto.getId(), objDto.getName(), objDto.getEmail(), objDto.getPassword(),
                    objDto.getRole(),
                    objDto.getStatus());
        } else {
            throw new UserException("Usuário Já cadastrado!");
        }
    }
}
