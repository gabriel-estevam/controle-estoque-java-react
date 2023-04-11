
import React from 'react';
import {SignInOrForgotPassword} from '../../components/SignInOrForgotPassword';
import './index.css';
import { Box, Paper } from '@mui/material';

export const Login: React.FC = () => {
    return (
        <Box 
            display="flex" 
            flexDirection="row" 
            component={Paper} 
            width="70vw" 
            height="40vw"
            alignItems="center" 
            justifyContent="center"
           // margin={5}
            marginX="20%"
            marginY={10}
            marginRight={2}
        >
            <Box 
                flex={1}
            >
                <Box
                    component={Paper}
                    width="100%"
                    height="40vw"
                    elevation={5}
                    //variant='outlined'
                >
                    <Box
                        component="img"
                        sx={{
                        height: '40vw',
                        width: '100%',
                        }}
                        
                       // alt=''
                        src=''
                        className='box-left'
                    />
                </Box>
            </Box>
            <Box
                flex={1}
                alignSelf="self-start"
            >
                <SignInOrForgotPassword/>

            </Box>
            
        </Box>
    );
};