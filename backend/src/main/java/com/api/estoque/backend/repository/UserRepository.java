package com.api.estoque.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.estoque.backend.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    public Optional<UserModel> findByEmail(String email);

    // public User findByIdAndEmailNot(Long id, String email);
    public Optional<UserModel> findByEmailAndIdNot(String email, Long id);
}
