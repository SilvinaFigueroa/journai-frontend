import React, { useState } from 'react'
import LoginForm from '../components/Login/loginForm'
import SignUp from '../components/signup/signupForm'

const LoginSignUp = () => {

    const [newUser, setNewUser] = useState(false)
    
    // conditional display: SignUp form (newUser = true) or Login form (newUser - false) 
    return(
        <>
        {newUser? (<SignUp setNewUser={setNewUser}/>)
        :
        (<LoginForm setNewUser={setNewUser}/>)}
        </>
    )
}

export default LoginSignUp