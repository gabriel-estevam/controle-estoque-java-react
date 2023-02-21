import { useState } from 'react';
import { SignIn }  from '../../api/Auth'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import SignInOrForgotPassword from '../../components/SignInOrForgotPassword';
import './index.css';


function Login() {
    
    const [auth, setAuth] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (event: any) => {
        const {name, value } = event.target;
        setAuth((preState) => ({
            ...preState,
            [name]: value,
        }));
    }    
    const autenticar = () => {
        let email: any;
        let password: any;

        email = document.querySelector('input[name="email"]');
        password = document.querySelector('input[name="password"]');
        SignIn(email.value, password.value);
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
                <form id="signin" className="" method='/' onSubmit={onSubmitForm}>
                    <input type="text" 
                           placeholder="Email" 
                           name="email"
                           value={auth.email}
                           onChange={handleInputChange}
                           className="email"
                           required />
                    <i id="iEmail"><FaEnvelope /></i>
                    <input type="password" 
                           placeholder="Password" 
                           name="password" 
                           value={auth.password}
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