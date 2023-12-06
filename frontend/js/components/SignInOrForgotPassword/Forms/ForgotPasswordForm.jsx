import React from 'react';
import { Box, Button } from '@mui/material';
import { VForm, VTextField, useVForm } from '../../../forms';
export const ForgotPasswordForm = () => {
    const { formRef, save } = useVForm();
    return (<Box>
            <VForm ref={formRef} onSubmit={(dados) => console.log(dados)}>
                <VTextField variant="outlined" name="email" label="E-mail" type="email" fullWidth sx={{
            marginBottom: 5,
        }}/>
                <Button onClick={save} variant="contained" color="primary" disableElevation fullWidth sx={{
            paddingY: 2,
            // marginTop: 5,
        }}>Reset Senha</Button>
            </VForm>
        </Box>);
};
