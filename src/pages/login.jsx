import React, { useState } from 'react'
import SignUp from '../components/signup/signupForm'
import LoginForm from '../components/login/loginForm'

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