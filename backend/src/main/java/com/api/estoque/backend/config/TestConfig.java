package com.api.estoque.backend.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.api.estoque.backend.model.Usuario;
import com.api.estoque.backend.repository.UsuarioRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public void run(String... args) throws Exception {
        Usuario u1 = new Usuario(null, "Maria", "maria@gmail.com", "123", 1, 0);
        Usuario u2 = new Usuario(null, "alex", "alex@gmail.com", "123", 0, 0);

        usuarioRepository.saveAll(Arrays.asList(u1, u2));
    }
}