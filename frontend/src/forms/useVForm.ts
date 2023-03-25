import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';

export const useVForm = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSave = useCallback(() => {
        formRef.current?.submitForm();
    }, []);

    return { 
        formRef, 
        save: handleSave,
    };
};