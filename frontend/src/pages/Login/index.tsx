import { useState } from 'react';
import axios from 'axios';
import { server, showError } from '../../common';

import { FaEnvelope, FaLock } from 'react-icons/fa'
import SignInOrForgotPassword from '../../components/SignInOrForgotPassword';
import './index.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
    });
    
    const navigate = useNavigate();
    
    const handleInputChange = (event: any) => {
        const {name, value } = event.target;
        setUsuario((preState) => ({
            ...preState,
            [name]: value,
        }));
    }    
     const autenticar = async () => {
        let email: any;
        let password: any;

        email = document.querySelector('input[name="email"]');
        password = document.querySelector('input[name="password"]');
        await axios.post(`${server}/api/auth`, {
            Headers: {
                "Content-Type": "application/json"
            },
            email: email.value,
            password: password.value,
        })
        .then(response => {
            localStorage.setItem("token", response.data.token);
            navigate("/home");
        })
        .catch(error => {
            showError(error);
        });
    }

    const onSubmitForm = (event: any) => {
        event.preventDefault();
        autenticar();
    }

    return (
        <div className="container">
            <div className="box-left"><img src="" alt="" /></div>
            <div className="box-right">
                <SignInOrForgotPassword/>
                <form id="signin" className="signin" method='/' onSubmit={onSubmitForm}>
                    <input type="text" 
                           placeholder="Email" 
                           name="email"
                           value={usuario.email}
                           onChange={handleInputChange}
                           className="email"
                           required />
                    <i id="iEmail"><FaEnvelope /></i>
                    <input type="password" 
                           placeholder="Password" 
                           name="password" 
                           value={usuario.password}
                           onChange={handleInputChange} 
                           required />
                    <i id="iPassword"><FaLock /></i>
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </div>
    )
}

export default Login;