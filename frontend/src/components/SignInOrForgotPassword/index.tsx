import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { SigninForm } from './Forms/SigninForm';
import { ForgotPasswordForm } from './Forms/ForgotPasswordForm';
//import './index.css';

export const SignInOrForgotPassword = () => {
    const [sign, setSign] = useState(true);
    
    return (
        <>
            <Box 
                display="flex"
                flexDirection="row"
                justifyContent="center"
            >
                <Box
                    sx={{
                        borderRadius: '30px',
                        boxShadow: '0 0 7px 0 #1d65e1',
                        marginTop: 2,
                    }}
                >
                    <Button
                        sx={{ 
                            background: sign ? 'linear-gradient(to right, #1669e5, #1d65e1)' : undefined,  
                            borderRadius: '30px', 
                            color: sign ?  'white' : 'black',
                        }} 
                        size="small" 
                        onClick={() => setSign(true) }
                        >Sign</Button>
                    <Button 
                        sx={{ 
                            background: !sign ? 'linear-gradient(to right, #1669e5, #1d65e1)' : undefined, 
                            borderRadius: '30px', 
                            color: !sign ? 'white' : 'black',
                        }} 
                        size="small" 
                        onClick={() => setSign(false)}
                    >Forgot Password</Button>
                </Box>
            </Box>
            <Box 
                display="flex" 
                flexDirection="column"
                alignSelf="center"
                alignContent="center"
                alignItems={sign ? "center" : undefined}
                marginTop={20}
            >
                {sign &&(
                    <SigninForm/>
                )}

                {!sign &&(
                    <ForgotPasswordForm/>
                )}
            </Box>
        </>
    );
};