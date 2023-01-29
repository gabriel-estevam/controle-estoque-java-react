package com.api.estoque.backend.model.enums;

public enum UserRole {
    USER(0),
    ADMIN(1);

    private int code;

    private UserRole(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static UserRole valueOf(int code) {
        for (UserRole value : UserRole.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid UserRole code");
    }
}
