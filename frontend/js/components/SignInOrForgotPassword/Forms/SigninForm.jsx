import React from 'react';
import { Box, Button } from '@mui/material';
import { VForm, VTextField, useVForm } from '../../../forms';
import { Auth } from '../../../services/api/auth/Auth';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../../../forms/TraducoesYup';
const formValidationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
});
export const SigninForm = () => {
    const navigate = useNavigate();
    const { formRef, save } = useVForm();
    const handleAuth = (dados) => {
        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
            Auth.signIn(dadosValidados)
                .then((result) => {
                if (result instanceof Error) {
                    return alert(result.message);
                }
                else {
                    localStorage.setItem("token", result);
                    navigate("/home");
                }
            });
        })
            .catch((errors) => {
            const validationErrors = {};
            errors.inner.forEach(error => {
                if (!error.path)
                    return; //se path undefined não executa que esta abaixo
                validationErrors[error.path] = error.message;
            });
            formRef.current?.setErrors(validationErrors);
        });
    };
    return (<Box>
            <VForm ref={formRef} onSubmit={handleAuth}>
                <VTextField variant="outlined" name="email" label="E-mail" type="email" fullWidth sx={{
            marginBottom: 5,
        }}/>

                <VTextField name="password" label="Senha" variant="outlined" type="password" sx={{
            "& input": { border: 'none',
                margin: 2,
                padding: 1,
                paddingY: 0,
                paddingRight: 0
            },
        }} fullWidth/>
                <Button onClick={save} variant="contained" color="primary" disableElevation fullWidth sx={{
            paddingY: 2,
            marginTop: 5,
        }}>Entrar</Button>
            </VForm>
        </Box>);
};
