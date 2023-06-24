package com.api.estoque.backend.controller.exceptions;

import java.time.Instant;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.api.estoque.backend.service.exceptions.AccoutIsLockedException;
import com.api.estoque.backend.service.exceptions.DataBaseException;
import com.api.estoque.backend.service.exceptions.InvalidPasswordException;
import com.api.estoque.backend.service.exceptions.ResourceNotFoundException;
import com.api.estoque.backend.service.exceptions.ModelException;

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

    @ExceptionHandler(ModelException.class)
    public ResponseEntity<StandardError> modelError(ModelException e, HttpServletRequest req) {
        String error = "Erro ao cadastrar!";
        HttpStatus status = HttpStatus.BAD_REQUEST;

        StandardError sError = new StandardError(Instant.now(), status.value(), error, e.getMessage(),
                req.getRequestURI());

        return ResponseEntity.status(status).body(sError);
   
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<StandardError> modelError(EntityNotFoundException e, HttpServletRequest req) {
        String error = "Erro ao buscar registro!";
        HttpStatus status = HttpStatus.NOT_FOUND;

        StandardError sError = new StandardError(Instant.now(), status.value(), error, e.getMessage(),
                req.getRequestURI());

        return ResponseEntity.status(status).body(sError);
   
    }
    
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<StandardError> UserNotFound(UsernameNotFoundException e, HttpServletRequest req) {
        String error = "Usuário não encontrado";
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        StandardError sError = new StandardError(Instant.now(), status.value(), error, e.getMessage(),
                req.getRequestURI());

        return ResponseEntity.status(status).body(sError);
    }
    
    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<StandardError> invalidPassword(InvalidPasswordException e, HttpServletRequest req) {
        String error = "Usuário não encontrado";
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        StandardError sError = new StandardError(Instant.now(), status.value(), error, e.getMessage(),
                req.getRequestURI());

        return ResponseEntity.status(status).body(sError);
    }
   
    @ExceptionHandler(AccoutIsLockedException.class)
    public ResponseEntity<StandardError> accoutIsLocked(AccoutIsLockedException e, HttpServletRequest req) {
        String error = "Usuário Bloqueado";
        HttpStatus status = HttpStatus.UNAUTHORIZED;

        StandardError sError = new StandardError(Instant.now(), status.value(), error, e.getMessage(),
                req.getRequestURI());

        return ResponseEntity.status(status).body(sError);
    }
}
