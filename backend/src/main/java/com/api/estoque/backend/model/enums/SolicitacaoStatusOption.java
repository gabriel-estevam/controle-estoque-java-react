package com.api.estoque.backend.model.enums;

public enum SolicitacaoStatusOption {
    ABERTA(0),
    APROVADA(1),
    REPROVADA(2);

    private int code;

    private SolicitacaoStatusOption(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static SolicitacaoStatusOption valueOf(int code) {
        for (SolicitacaoStatusOption value : SolicitacaoStatusOption.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid SolicitacaoStatus code");
    }
}
