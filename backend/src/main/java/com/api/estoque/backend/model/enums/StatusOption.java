package com.api.estoque.backend.model.enums;

public enum StatusOption {
    BLOCKED(0),
    ACTIVE(1);

    private int code;

    private StatusOption(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static StatusOption valueOf(int code) {
        for (StatusOption value : StatusOption.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid UserStatus code");
    }
}
