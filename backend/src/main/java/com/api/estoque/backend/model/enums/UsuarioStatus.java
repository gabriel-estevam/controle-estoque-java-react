package com.api.estoque.backend.model.enums;

public enum UsuarioStatus {
    INATIVO(0),
    ATIVO(1);

    private int code;

    private UsuarioStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static UsuarioStatus valueOf(int code) {
        for (UsuarioStatus value : UsuarioStatus.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid UsuarioStatus code");
    }
}
