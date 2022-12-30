package com.api.estoque.backend.controller.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;
import com.api.estoque.backend.service.exceptions.UserException;

@ControllerAdvice
public class ResourceExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<StandardError> resourceNotFound(ResourceNotFoundException e, HttpServletRequest req) {
        String error = "Resource not found";
        HttpStatus status = HttpStatus.NOT_FOUND;

        StandardError sError = new StandardError(Instant.now(), status.value(), error, e.getMessage(),
                req.getRequestURI());

        return ResponseEntity.status(status).body(sError);
    }

    @ExceptionHandler(DataBaseException.class)
    public ResponseEntity<StandardError> databaseError(DataBaseException e, HttpServletRequest req) {
        String error = "Database error";
        HttpStatus status = HttpStatus.BAD_REQUEST;

        StandardError sError = new StandardError(Instant.now(), status.value(), error, e.getMessage(),
                req.getRequestURI());

        return ResponseEntity.status(status).body(sError);
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<StandardError> usuarioCadastrado(UserException e, HttpServletRequest req) {
        String error = "Usuário Cadastrado";
        HttpStatus status = HttpStatus.BAD_REQUEST;

        StandardError sError = new StandardError(Instant.now(), status.value(), error, e.getMessage(),
                req.getRequestURI());

        return ResponseEntity.status(status).body(sError);
    }
}
