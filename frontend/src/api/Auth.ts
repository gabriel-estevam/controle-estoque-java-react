import { useContext } from 'react';
import axios from 'axios';
import { server, showError } from '../common';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export async function SignIn(email : string, password : string) {
    const navigate = useNavigate();
    await axios.post(`${server}/api/auth`, {
        Headers: {
            "Content-Type": "application/json"
        },
        email: email,
        password: password,
    })
    .then(response => {
        //showSucces(response.data.token);
        localStorage.setItem("token", response.data.token);
        //console.log("TESTE" + localStorage.getItem("token"));

        // @ts-ignore
        navigate("/home")
    })
    .catch(error => {
        showError(error);
    });
}