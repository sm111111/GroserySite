import React, { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Signup = () => {
    const [getSignUp, setGetSignUp] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handlegetInput = (e) => {
        setGetSignUp({ ...getSignUp, [e.target.name]: e.target.value })
    }

    const SendData = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://groserysite.onrender.com/auth/signup', getSignUp)
            if (res.status === 200 || res.status === 201) {
                setGetSignUp({ name: '', email: '', password: '' })
                toast.success("SignUp Succesfully")
                setTimeout(() => navigate('/'), 1000)
            }

        } catch (error) {
            console.log("Server Side Error", error)
            toast.error("Server Side Error")
        }
    }

    return (
        <div className='Signup-container'>
            <ToastContainer />
            <form onSubmit={SendData}>
                <h1>Signup</h1>
                <input type="text"
                    name='name'
                    placeholder='UserName'
                    onChange={handlegetInput}
                    value={getSignUp.name}
                    required
                />

                <input type="email"
                    name='email'
                    placeholder='UserEmail'
                    onChange={handlegetInput}
                    value={getSignUp.email}
                    required
                />

                <input type="password"
                    name='password'
                    placeholder='UserPasword'
                    onChange={handlegetInput}
                    value={getSignUp.password}
                    required
                />


                <div className="other">
                    <Link>forgetPassword</Link>
                    <Link to='/'>Login</Link>
                </div>
                <button type="submit">Signup</button>
            </form>

        </div>
    )
}

export default Signup