package com.api.estoque.backend.service.exceptions;

public class AuthException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public AuthException(String msg) {
        super(msg);
    }
}
