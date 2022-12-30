package com.api.estoque.backend.model.enums;

public enum UserStatus {
    STATUS_INACTIVE(0),
    STATUS_ACTIVE(1);

    private int code;

    private UserStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static UserStatus valueOf(int code) {
        for (UserStatus value : UserStatus.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }
        throw new IllegalArgumentException("Invalid UserStatus code");
    }
}
