package com.api.estoque.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.dto.AuthDTO;
import com.api.estoque.backend.model.UserModel;
import com.api.estoque.backend.repository.UserRepository;
import com.api.estoque.backend.service.exceptions.AuthException;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    public UserModel findByEmail(String email) {
        Optional<UserModel> user = repository.findByEmail(email);
        return user.orElseThrow(() -> new AuthException("Usuário ou senha incorreta!"));
    }

    public Boolean validateInfo(AuthDTO authDTO) {
        UserModel user;
        user = findByEmail(authDTO.getEmail());
        boolean valid = encoder.matches(authDTO.getPassword(), user.getPassword());
        if (!valid) {
            throw new AuthException("Usuário ou senha incorreta!");
        }

        return valid;
    }
}
