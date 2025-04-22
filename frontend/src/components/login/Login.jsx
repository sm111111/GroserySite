import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [getLogin, setGetLogin] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleInput = (e) => {
        setGetLogin({ ...getLogin, [e.target.name]: e.target.value })
    }

    const reciveData = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post("http://localhost:5000/auth/login", getLogin, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.status === 200 || res.status === 201) {
                setGetLogin({ email: '', password: '' })
                toast.success("Login Succesfully")

                //save user info and token in localstorage
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem('token', res.data.token)


                setTimeout(() => navigate('/home'), 1000)


            }

        } catch (error) {
            console.log("Server Side Error", error)
            toast.error("Password is Incorrect")
        }

    }




    return (
        <div className='Login-container'>
            <ToastContainer />
            <form onSubmit={reciveData}>
                <h1>Login</h1>
                <input type="email"
                    name='email'
                    placeholder='UserEmail'
                    onChange={handleInput}
                    value={getLogin.email}
                />

                <input type="password"
                    name='password'
                    placeholder='UserPassword'
                    onChange={handleInput}
                    value={getLogin.password}
                />


                <div className="other">
                    <Link >forgetPassword</Link>
                    <Link to='/signup'>SignUP</Link>
                </div>
                <button type='submit'>Login</button>
            </form>

        </div>
    )
}

export default Login