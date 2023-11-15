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
<<<<<<< HEAD
        throw new IllegalArgumentException("Invalid StatusOption code");
=======
        throw new IllegalArgumentException("Invalid Status code");
>>>>>>> 21363a4406dc42fb045afc9d30029e61e5bcd470
    }
}
