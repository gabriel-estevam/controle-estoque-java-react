import axios from 'axios';
import { server, showError } from '../common';

export async function SignIn(email : string, password : string) {
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
    })
    .catch(error => {
        showError(error);
    });
}