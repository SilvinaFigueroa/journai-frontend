import React, { useState } from 'react'

import { useLocation } from 'react-router-dom';

import SignUp from '../components/signup/signupForm'
import LoginForm from '../components/login/loginForm'

const LoginSignUp = () => {
    const location = useLocation();


    /*@deprecated: Replacing newUser Toggle implementation with current user location - this will allow to show 
    the correct form to the user when clicking the navbar buttons

        const [newUser, setNewUser] = useState(false) 
        conditional display: SignUp form (newUser = true) or Login form (newUser - false) */

    const signUp = location.pathname === '/signup';


    return (
        // <>
        // {newUser? (<SignUp setNewUser={setNewUser}/>)
        // :
        // (<LoginForm setNewUser={setNewUser}/>)}
        // </>

        <>
            {signUp ? (<SignUp/>)
                :
                (<LoginForm/>)}
        </>
    )
}

export default LoginSignUp