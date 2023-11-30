package com.api.estoque.backend.model.enums;

public enum PedidoStatusOption {
    REALIZADO(0),
    RECEBIDO(1),
    CANCELADO(2);

    private int code;

    private PedidoStatusOption(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static PedidoStatusOption valueOf(int code) {
        for (PedidoStatusOption value : PedidoStatusOption.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid PedidoStatus code");
    }
}
