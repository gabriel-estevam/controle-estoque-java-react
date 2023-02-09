package com.api.estoque.backend.service.exceptions;

public class ModelException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ModelException(String msg) {
        super(msg);
    }
}
