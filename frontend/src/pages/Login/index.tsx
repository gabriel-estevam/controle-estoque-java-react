import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa'
import SignInOrForgotPassword from './SignInOrForgotPassword';
import './index.css'
function Login() {
    return(
        <div className="container">
             <div className="box-left">
                
                <img src="" alt="" />
               
            </div>
            <div className="box-right">
                <SignInOrForgotPassword/>
                <form id="signin" className="">
                    <input type="text" placeholder="Email" required />
                    <i id="iEmail"><FaEnvelope /></i>
                    <input type="password" placeholder="Password" required />
                    <i id="iPassword"><FaLock /></i>
                    <button type="submit">Sign in</button>
                </form>
                
                <form id="signup">
                    <input type="text" placeholder="Email" required />
                    <i id="iEmail"><FaEnvelope /></i>
                    <input type="password" placeholder="Password" required />
                    <i id="iPassword"><FaLock /></i>
                    <input type="password" placeholder="Confirm Password" required />
                    <i id="iPassword2"><FaLock /></i>
                    <button type="submit" id="confim">Confirm</button>
                </form>
            </div>
        </div>
    )
}

export default Login;