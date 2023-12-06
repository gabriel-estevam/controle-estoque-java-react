import { useCallback, useRef } from 'react';
export const useVForm = () => {
    const formRef = useRef(null);
    const handleSave = useCallback(() => {
        formRef.current?.submitForm();
    }, []);
    return {
        formRef,
        save: handleSave,
    };
};
