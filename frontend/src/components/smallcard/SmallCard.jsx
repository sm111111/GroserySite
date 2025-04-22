import React from 'react'
import './SmallCard.css'
import salad from '../assets/img/salad.png'
import { useNavigate } from 'react-router-dom'

const SmallCard = ({ smallcard_id, smallcard_name, smallcard_price }) => {

    const naviagte = useNavigate();

    const redirectToMainPage = () => {
        naviagte(`/main/${smallcard_id}`)
    }


    return (
        <div className='SmallCard' onClick={redirectToMainPage}>

            <div className="small-img">
                <img src={salad} alt="" />
            </div>

            <div className="small-name-price">
                <p>{smallcard_name}</p>
                <p>{smallcard_price}</p>
            </div>

        </div>
    )
}

export default SmallCard