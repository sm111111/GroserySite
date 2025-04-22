import React from 'react'
import './BigCard.css'
import salad from '../assets/img/salad.png'
import { useNavigate } from 'react-router-dom'

const BigCard = ({ big_img }) => {

    const navigate = useNavigate();

    const redirectTofilter = (e) => {
        e.preventDefault();
        navigate('/fill')
    }


    return (
        <div className='BigCard-container'>

            <div className="bigcard-info">
                <span>Find Your Grosery </span>
                <button onClick={redirectTofilter}>Shon Now</button>
            </div>

            <div className="big-img">
                <img src={big_img} alt="" />
            </div>
        </div>
    )
}

export default BigCard