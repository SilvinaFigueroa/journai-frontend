import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/auth/auth_context"

import './signupForm.css' //import styling css file


const SignUp = ({ setNewUser }) => {

    const nav = useNavigate()
    // get the SignUp function from the auth_context
    const { signUp } = useAuth()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordVal: '',
        location: ''
    })

    const handleChange = (event) => {
        setFormData({
            ...formData,
            // update form data --> field name : field value
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            //validate password 
            if (formData.password !== formData.passwordVal)
                throw "Passwords don't match"
            else {
                // signUp with the data from the form 
                await signUp(formData)
                // redirect the user to the journal page
                nav('/journal')
            }
        } catch (err) {
            console.error(err)

        }
    }

    // toggle to change the form
    const handleClick = () => {
        setNewUser(false)
    }

    return (

        <div className="signUpForm">
            <h2>Sign Up</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
            <input type="text" id='firstName' name='firstName' placeholder="Name" required onChange={handleChange} />
                <input type="text" id='lastName' name='lastName' placeholder="Last Name" required onChange={handleChange} />
                <input type="text" id='location' name='location' placeholder="Your location (City)" required onChange={handleChange} />
                <input type="email" id='email' name='email' placeholder="Email" required onChange={handleChange} />
                <input type="password" id="password" name="password" placeholder="Password" minLength={8} required onChange={handleChange} />
                <input type="password" id="passwordVal" name="passwordVal" placeholder="Retry Password" minLength={8} required onChange={handleChange} />
               
                <button type="submit">Sign In</button>
            </form>
            <p>Already have an account? <button onClick={handleClick}>Log In</button></p>
        </div>
    )

}

export default SignUp
