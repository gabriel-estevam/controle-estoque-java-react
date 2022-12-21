package com.api.estoque.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.repository.UsuarioRepository;

@Service
public class DetalheUsuarioServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        /*
         * Optional<Usuario> usuario = repository.findByEmail(username);
         * if (usuario == null) {
         * throw new UsernameNotFoundException("Usuario [" + username +
         * "] não encontrado");
         * }
         */
        return null;
    }

}
