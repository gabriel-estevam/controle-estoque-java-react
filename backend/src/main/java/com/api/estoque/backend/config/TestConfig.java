package com.api.estoque.backend.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.api.estoque.backend.model.User;
import com.api.estoque.backend.model.enums.UserRole;
import com.api.estoque.backend.model.enums.UserStatus;
import com.api.estoque.backend.repository.UserRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        User u1 = new User(null, "Maria", "maria@gmail.com", "123", UserRole.ROLE_ADMIN,
                UserStatus.STATUS_ACTIVE);
        User u2 = new User(null, "alex", "alex@gmail.com", "123", UserRole.ROLE_ADMIN,
                UserStatus.STATUS_ACTIVE);

        userRepository.saveAll(Arrays.asList(u1, u2));
    }
}
