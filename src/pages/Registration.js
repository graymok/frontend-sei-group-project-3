import { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import axios from 'axios'



const Registration = (props) => {

    const {userState} = useContext(UserContext)
    const [user, setUser] = userState

    const loginUser = async () => {
        let response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}user/login`, {
            email: props.email,
            password: props.password
        })
        console.log(response)
        localStorage.setItem('userId', response.data.userId)
        setUser({
            ...user,
            id: response.data.userId,
            name: response.data.user.name
        })
    }

    const registerUser = async () => {
        let response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}user/signup`, {
            name: props.name,
            email: props.email,
            password: props.password
        })
        console.log(response)
        localStorage.setItem('userId', response.data.userId)
        setUser({
            ...user,
            id: response.data.userId,
            name: response.data.newUser.name
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        loginUser()
    }

    const handleRegister = (e) => {
        e.preventDefault()
        registerUser()
    }

    return (
        <div className="registration-container">
            { props.type === 'Login' && 
            <div className="form-container">
                <span className="form-headline">Welcome back!</span>
                <form className="form-inputs" onSubmit={handleLogin}>
                    <label className="input-label" htmlFor="login-email">Email</label>
                    <input className="input-field" value={props.email} onChange={(e) => {props.setEmail(e.target.value)}} required />
                    <label className="input-label" htmlFor="login-password">Password</label>
                    <input className="input-field" type="password" value={props.password} onChange={(e) => {props.setPassword(e.target.value)}} required />               
                    <input className="input-button" type="submit" value="LOGIN" />
                </form>
            </div>            
            }
            { props.type === 'Register' &&
            <div className="form-container-register">
                <span className="form-headline">Let's get started!</span>
                <form className="form-inputs" onSubmit={handleRegister}>
                    <label className="input-label" htmlFor="register-name">First Name</label>
                    <input className="input-field" value={props.name} onChange={(e) => {props.setName(e.target.value)}} required />
                    <label className="input-label" htmlFor="register-email">Email</label>
                    <input className="input-field" value={props.email} onChange={(e) => {props.setEmail(e.target.value)}} required />
                    <label className="input-label" htmlFor="register-password">Password</label>
                    <input className="input-field" type="password" value={props.password} onChange={(e) => {props.setPassword(e.target.value)}} required />               
                    <input className="input-button" type="submit" value="SIGN UP" />
                </form>
            </div>            
            }
        </div>    
    )
}

export default Registration