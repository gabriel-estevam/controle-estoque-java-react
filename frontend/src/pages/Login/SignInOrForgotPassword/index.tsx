import React from 'react';
import './index.css';

function SignInOrForgotPassword () {
    const swipe = (element : any)  => {

        let btnColor : any;
        
        btnColor = document.querySelector('.btnColor');
        
        if(element.target.id === "ForgotPassword") {
            btnColor.style.left = "110px";
            btnColor.style.width = " 160px";
        }

        else {
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