package com.api.estoque.backend.service.exceptions;

public class AccoutIsLockedException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public AccoutIsLockedException(String message) {
        super(message);
    }
    
}
