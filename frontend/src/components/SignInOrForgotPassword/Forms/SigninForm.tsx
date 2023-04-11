import React from 'react';
import { Box, Button } from '@mui/material';
import { VForm, VTextField, useVForm } from '../../../forms';


export const SigninForm: React.FC = () => {
    const { formRef, save } = useVForm();
    return (
        <Box>
            <VForm ref={formRef} onSubmit={(dados) => console.log(dados)}>
                <VTextField
                    variant="outlined"
                    name="email"
                    label="E-mail"
                    type="email"
                    fullWidth
                    sx={{
                        marginBottom: 5,
                    }}
                />

                <VTextField
                    name="password"
                    label="Senha" 
                    variant="outlined"
                    type="password"
                    sx={{
                        "& input": {border: 'none', 
                                    margin: 2, 
                                    padding: 1, 
                                    paddingY:0,
                                    paddingRight: 0
                        },
                    }}
                    fullWidth
                />
                <Button 
                    onClick={save}
                    variant="contained" 
                    color="primary"
                    disableElevation
                    fullWidth
                    sx={{
                        paddingY: 2,
                        marginTop: 5,
                    }}
                >Entrar</Button>
            </VForm>
        </Box>
    );
};