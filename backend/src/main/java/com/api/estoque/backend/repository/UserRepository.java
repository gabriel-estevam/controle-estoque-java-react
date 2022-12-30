package com.api.estoque.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.estoque.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findByEmail(String email);

    // public User findByIdAndEmailNot(Long id, String email);
    public Optional<User> findByEmailAndIdNot(String email, Long id);
}
