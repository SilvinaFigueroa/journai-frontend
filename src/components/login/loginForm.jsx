import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from '../../contexts/auth/auth_context'

const LoginForm = ({ setNewUser }) => {

    const nav = useNavigate()
    // get the login function from the auth_context
    const { login } = auth()
    // useState to hold the data passed on the form
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // Setting the formData when the form fields change to update the State
    const handleChange = (event) => {
        setFormData({
            ...FormData,
            // update form data --> field name : field value
            [event.target.name]: event.target.value
        })
    }

    // When form is submited
    const handleSubmit = async (event) => {
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
        <div className="loginForm">
            <h2>Login</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <input type="email" id="email" name="email" placeholder="Email" required onChange={handleChange} />
                <input type="password" id="password" placeholder="Password" required minLength='6' onChange={handleChange} />
                <button type="submit">Log In</button>
            </form>
            {/* Include SignUp button that toggles setNewUser */}
            <p>Don't have and account? <button onClick={handleClick}>Sign Up</button> </p>
        </div>
    )
}

export default LoginForm