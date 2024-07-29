import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../contexts/auth/auth_context'


import './loginForm.css' //import styling css file


const LoginForm = ({ setNewUser }) => {

    const nav = useNavigate()
    // get the login function from the auth_context
    const { login } = useAuth()
    // useState to hold the data passed on the form
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // Setting the formData when the form fields change to update the State
    const handleChange = (event) => {
        setFormData({
            ...formData,
            // update form data --> field name : field value
            [event.target.name]: event.target.value
        })
    }

    // When form is submited
    const handleSubmit = async (event) => {
        console.log(`data to be sent for login ${JSON.stringify(formData)}`)
        event.preventDefault()
        await login(formData)
        console.log("Auth Sucessful")
        // redirect to the journal entry page after login
        nav('/journal')
    }

    const handleClick = () => {
        // toggle pass to login/signUp form
        setNewUser(true)
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-left">
                    <img src="src\images\background-login.svg" alt="Login" />
                </div>
                <div className="login-rigth">
                    <h2>Login</h2>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <input className="input-group" type="email" id="email" name="email" placeholder="Email" required onChange={handleChange} />
                        <input className="input-group" type="password" id="password" name='password' placeholder="Password" required minLength='6' onChange={handleChange} />
                        <button className="login-button" type="submit">Log In</button>
                    </form>
                    {/* Include SignUp button that toggles setNewUser */}
                    <p>Don't have and account? <button className="signup-button" onClick={handleClick}>Sign Up</button> </p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm