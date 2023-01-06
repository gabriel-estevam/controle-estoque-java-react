import React from 'react';
import './index.css';

function SignInOrForgotPassword () {
    const swipe = (element : any)  => {
        let formSignin : any;
        let formSignup : any;
        let btnColor : any;
    
        formSignin = document.querySelector('#signin');
        formSignup = document.querySelector('#signup');
        btnColor = document.querySelector('.btnColor');
        
        if(element.target.id === "ForgotPassword") {
            formSignup.style.opacity = "1";
            formSignin.style.opacity = "0";
            
            btnColor.style.left = "110px";
            btnColor.style.width = " 160px";
        }

        else {
            formSignup.style.opacity = "0";
            formSignin.style.opacity = "1";
            btnColor.style.left = "0px";
            btnColor.style.width = "108px";
        }

    }

    const onClick = (event : any) => {
        swipe(event);
    }

    return (
            <div className="buttonsForm">
                <div className="btnColor"></div>
                <button id="btnSignin" onClick={onClick}>Sign in</button>
                <button id="ForgotPassword" onClick={onClick}>Forgot Password</button>
            </div>
    )
};
export default SignInOrForgotPassword;