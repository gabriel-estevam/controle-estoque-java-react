package com.api.estoque.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.model.UserModel;
import com.api.estoque.backend.repository.UserRepository;
import com.api.estoque.backend.service.exceptions.InvalidPasswordException;

@Service
public class UsuarioServiceImpl implements UserDetailsService {

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserRepository repository;

    public UserDetails autenticar(UserModel usuario) {
        UserDetails userCreated = loadUserByUsername(usuario.getEmail());
        boolean senhasMatch = encoder.matches(usuario.getPassword(), userCreated.getPassword());
        if(senhasMatch) {
            return userCreated;
        }
        throw new InvalidPasswordException("Senha invalida!");
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Esse metodo carrega o usuario da base de dados

        UserModel usuario = repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario [ " + username + "]Não encontrado"));

        String[] roles = usuario.getRole().getCode() == 1 ? new String[] { "ADMIN", "USER" } : new String[] { "USER" };

        return User.builder()
                .username(usuario.getEmail())
                .password(usuario.getPassword())
                .roles(roles)
                .build();
    }

}