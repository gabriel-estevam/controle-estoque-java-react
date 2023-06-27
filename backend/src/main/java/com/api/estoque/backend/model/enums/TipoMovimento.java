package com.api.estoque.backend.model.enums;

public enum TipoMovimento {
    ENTRADA(0),
    SAIDA(1);

    private int code;

    private TipoMovimento(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static TipoMovimento valueOf(int code) {
        for (TipoMovimento value : TipoMovimento.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid TipoMovimento code");
    }
}
