package com.api.estoque.backend.model.enums;

public enum UsuarioTipo {
    USUARIO(0),
    ADMINISTRADOR(1);

    private int code;

    private UsuarioTipo(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static UsuarioTipo valueOf(int code) {
        for (UsuarioTipo value : UsuarioTipo.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid Usuariotipo code");
    }
}
