import React from 'react';
import './index.css';

function swipe(element : any) {
    let formSignin : any;
    let formSignup : any;
    let btnColor : any;
    let container : any;

    formSignin = document.querySelector('#signin');
    formSignup = document.querySelector('#signup');
    btnColor = document.querySelector('.btnColor');
    container = document.querySelector('.container');
    if(element.target.id === 'ForgotPassword') {
        console.log(element);
        formSignin.style.left = "-450px";
        formSignup.style.left = "25px";
        btnColor.style.left = "110px";
        btnColor.style.width = " 160px";
        container.style.height = "450px";
    }
    else {
        formSignin.style.left = "25px";
        formSignup.style.left = "450px";
        btnColor.style.left = "0px";
        btnColor.style.width = "108px";
        container.style.height = "380px";
    }
}
function onClick(event : any) {
    console.log(event.target.id);
   // swipe(event);
}
const SignInOrForgotPassword = () => {
    return (
            <div className="buttonsForm">
                <div className="btnColor"></div>
                <button id="btnSignin" onClick={onClick}>Sign in</button>
                <button id="ForgotPassword" onClick={onClick}>Forgot Password</button>
            </div>
    )
};
export default SignInOrForgotPassword;